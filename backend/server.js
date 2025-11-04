require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
// Optional SendGrid: require it only if present so server can run without it
let sgMail = null;
try {
	// try to require optional dependency; if it's not installed we won't crash
	/* eslint-disable global-require */
	sgMail = require('@sendgrid/mail');
	/* eslint-enable global-require */
} catch (err) {
	console.warn('Optional dependency @sendgrid/mail not installed — email sending disabled');
}

// Configure SendGrid if available and key provided
if (sgMail) {
	if (!process.env.SENDGRID_API_KEY) {
		console.warn('SENDGRID_API_KEY not set — email sending will fail');
	} else {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	}
}

// Initialize Firebase Admin
try {
    // First try to load from serviceAccount.json file
    const serviceAccount = require('./serviceAccount.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'conpatas-f7d07',
        databaseURL: 'https://conpatas-f7d07-default-rtdb.firebaseio.com'
    });
    console.log('Firebase Admin initialized with service account');
} catch (err) {
    console.error('Error loading service account, falling back to default config:', err.message);
    // Fall back to basic config if service account fails
    admin.initializeApp({
        projectId: 'conpatas-f7d07',
        databaseURL: 'https://conpatas-f7d07-default-rtdb.firebaseio.com'
    });
}

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Simple token verifier middleware (optional)
async function verifyToken(req, res, next) {
	const header = req.headers.authorization || '';
	const match = header.match(/^Bearer\s+(.*)$/i);
	if (!match) {
		req.user = null;
		return next();
	}
	const idToken = match[1];
	try {
		const decoded = await admin.auth().verifyIdToken(idToken);
		req.user = decoded;
	} catch (err) {
		console.warn('Invalid ID token', err);
		req.user = null;
	}
	return next();
}

function escapeHtml(s = '') {
	return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function getDogById(dogId) {
	if (!dogId) return null;

	// First try to fetch by Firestore document id
	try {
		const ref = db.collection('Perro').doc(dogId);
		const snap = await ref.get();
		if (snap.exists) return { id: snap.id, ...snap.data() };
	} catch (err) {
		console.warn('getDogById: fetch by doc id failed, trying field query', err);
	}

	// Fallback: query by 'id' field
	try {
		const snapshot = await db.collection('Perro').where('id', '==', dogId).limit(1).get();
		if (!snapshot.empty) {
			const doc = snapshot.docs[0];
			return { id: doc.id, ...doc.data() };
		}
	} catch (err) {
		console.error('getDogById: field query failed', err);
		throw err;
	}

	return null;
}

app.post('/api/applications', verifyToken, async (req, res) => {
	try {
		const { dogId, form } = req.body || {};
		if (!dogId || !form) return res.status(400).json({ error: 'dogId and form required' });

		const dog = await getDogById(dogId);
		if (!dog) return res.status(404).json({ error: 'Dog not found' });

		const ownerEmail = dog.ownerEmail || dog.owner || dog.email;
		if (!ownerEmail) return res.status(400).json({ error: 'Owner email not available on dog record' });

		const subject = `Solicitud de adopción para ${dog.name || 'un perro'}`;
		const html = `
			<p>Tienes una nueva solicitud de adopción para <strong>${escapeHtml(dog.name || '')}</strong>.</p>
			<h3>Datos del aplicante</h3>
			<ul>
				<li><strong>Nombre:</strong> ${escapeHtml(form.fullName || '')}</li>
				<li><strong>Email:</strong> ${escapeHtml(form.email || '')}</li>
				<li><strong>Teléfono:</strong> ${escapeHtml(form.phone || '')}</li>
			</ul>
			<h3>Formulario completo</h3>
			<pre style="white-space:pre-wrap;">${escapeHtml(JSON.stringify(form, null, 2))}</pre>
		`;

		// Send email via SendGrid if configured and available
		if (sgMail && process.env.SENDGRID_API_KEY && process.env.EMAIL_FROM) {
			const msg = {
				to: ownerEmail,
				from: process.env.EMAIL_FROM,
				subject,
				html
			};
			await sgMail.send(msg);
		} else {
			if (!sgMail) console.warn('SendGrid module not available; skipping email send');
			else console.warn('SendGrid or EMAIL_FROM not configured; skipping email send');
		}

		// Save application record
			await db.collection('Applications').add({
				dogId,
				dogName: dog.name || null,
				ownerEmail: ownerEmail || null,
				form,
				applicantUid: req.user?.uid ?? null,
				applicantEmail: req.user?.email ?? form.email ?? null,
				status: 'pending',
				createdAt: admin.firestore.FieldValue.serverTimestamp()
			});

		return res.json({ ok: true });
	} catch (err) {
		console.error('Error in /api/applications', err);
		return res.status(500).json({ error: 'internal' });
	}
});

	// Get applications received by a dog owner
	// If ownerEmail is not provided, and user is authenticated, uses req.user.email
	app.get('/api/applications/received', verifyToken, async (req, res) => {
		try {
			const ownerEmail = (req.query.ownerEmail && String(req.query.ownerEmail)) || req.user?.email || null;
			if (!ownerEmail) return res.status(400).json({ error: 'ownerEmail required (or provide ID token)' });

			const col = db.collection('Applications');
			const snapshot = await col.where('ownerEmail', '==', ownerEmail).get();
			const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
			return res.json({ items });
		} catch (err) {
			console.error('Error in GET /api/applications/received', err);
			return res.status(500).json({ error: 'internal' });
		}
	});

	// Get applications sent by the current user/applicant
	// If applicantEmail is not provided, and user is authenticated, uses req.user.email
	app.get('/api/applications/sent', verifyToken, async (req, res) => {
		try {
			const applicantEmail = (req.query.applicantEmail && String(req.query.applicantEmail)) || req.user?.email || null;
			if (!applicantEmail) return res.status(400).json({ error: 'applicantEmail required (or provide ID token)' });

			const col = db.collection('Applications');
			const snapshot = await col.where('applicantEmail', '==', applicantEmail).get();
			const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
			return res.json({ items });
		} catch (err) {
			console.error('Error in GET /api/applications/sent', err);
			return res.status(500).json({ error: 'internal' });
		}
	});

	// Get applications by dog id
	app.get('/api/applications/by-dog/:dogId', async (req, res) => {
		try {
			const { dogId } = req.params;
			if (!dogId) return res.status(400).json({ error: 'dogId required' });

			const col = db.collection('Applications');
			const snapshot = await col.where('dogId', '==', dogId).get();
			const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
			return res.json({ items });
		} catch (err) {
			console.error('Error in GET /api/applications/by-dog/:dogId', err);
			return res.status(500).json({ error: 'internal' });
		}
	});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend listening on', PORT));

// Delete a dog by id (requires auth and ownership)
app.delete('/api/dogs/:dogId', verifyToken, async (req, res) => {
	try {
		if (!req.user || !req.user.email) {
			return res.status(401).json({ error: 'auth required' });
		}
		const { dogId } = req.params;
		console.log('[DELETE /api/dogs/:dogId] start', { user: req.user?.email, dogId });
		const dogNameQ = (req.query.dogName ? String(req.query.dogName) : '').trim();
		const dog = await getDogById(dogId);
		if (!dog) {
			console.warn('[DELETE /api/dogs/:dogId] dog not found, running fallback cleanup', { dogId, dogNameQ });
			// Fallback: try to delete any docs for this owner that match by custom id or by name
			try {
				const owner = (req.user?.email || '').toLowerCase();
				let ownerDocs = [];
				if (owner) {
					try {
						const q = await db.collection('Perro').where('ownerEmail', '==', owner).get();
						ownerDocs = q.docs;
					} catch (e) {
						const all = await db.collection('Perro').get();
						ownerDocs = all.docs.filter(d => String((d.data().ownerEmail||'')).toLowerCase() === owner);
					}
					const batch = db.batch();
					let delCount = 0;
					ownerDocs.forEach(refDoc => {
						const data = refDoc.data() || {};
						const sameDocId = refDoc.id === dogId;
						const sameCustomId = data.id && String(data.id) === String(dogId);
						const sameName = dogNameQ && data.name && String(data.name).trim().toLowerCase() === dogNameQ.toLowerCase();
						if (sameDocId || sameCustomId || sameName) {
							batch.delete(refDoc.ref);
							delCount++;
						}
					});
					if (delCount) {
						await batch.commit();
						console.log('[DELETE /api/dogs/:dogId] fallback deleted owner docs', { delCount });
					}
				}
			} catch (err) {
				console.warn('[DELETE /api/dogs/:dogId] fallback owner cleanup failed', err);
			}

			// Always try to cleanup applications by dogId
			try {
				const appsSnap = await db.collection('Applications').where('dogId', '==', dogId).get();
				if (!appsSnap.empty) {
					const batch = db.batch();
					appsSnap.docs.forEach(d => batch.delete(d.ref));
					await batch.commit();
					console.log('[DELETE /api/dogs/:dogId] fallback deleted Applications', { count: appsSnap.size });
				}
			} catch (err) {
				console.warn('[DELETE /api/dogs/:dogId] fallback apps cleanup failed', err);
			}

			return res.json({ ok: true, fallback: true });
		}
		console.log('[DELETE /api/dogs/:dogId] resolved dog', { firestoreId: dog.id, name: dog.name, ownerEmail: dog.ownerEmail || dog.owner || dog.email || null });

		const ownerEmail = dog.ownerEmail || dog.owner || dog.email || null;
		// If we can verify ownership and it mismatches, forbid. If we cannot verify (missing ownerEmail), allow as fallback.
		if (ownerEmail && String(ownerEmail).toLowerCase() !== String(req.user.email).toLowerCase()) {
			console.warn('[DELETE /api/dogs/:dogId] forbidden: owner mismatch', { ownerEmail, user: req.user?.email });
			return res.status(403).json({ error: 'forbidden' });
		}

		// Delete dog document
		await db.collection('Perro').doc(dog.id).delete();
		console.log('[DELETE /api/dogs/:dogId] deleted main doc', { firestoreId: dog.id });

		// Also delete any other documents that used a custom 'id' field equal to dogId (defensive cleanup)
		try {
			const dupSnap = await db.collection('Perro').where('id', '==', dogId).get();
			if (!dupSnap.empty) {
				const batch = db.batch();
				dupSnap.docs.forEach(d => batch.delete(d.ref));
				await batch.commit();
				console.log('[DELETE /api/dogs/:dogId] deleted duplicate Perro docs by custom id', { count: dupSnap.size });
			}
		} catch (err) {
			console.warn('Failed deleting duplicate Perro docs with id field', dogId, err);
		}

		// Extra defensive cleanup: remove other Perro docs for same owner that look like the same dog (same name or same custom id)
		try {
			const owner = (ownerEmail || req.user?.email || '').toLowerCase();
			if (owner) {
				const ownerSnap = await db.collection('Perro').where('ownerEmail', '==', owner).get().catch(async (e) => {
					// Some records may store ownerEmail in mixed case; try case-insensitive fallback by scanning all and filtering
					const allSnap = await db.collection('Perro').get();
					return { docs: allSnap.docs.filter(d => String((d.data().ownerEmail||'')).toLowerCase() === owner) };
				});
				if (ownerSnap && ownerSnap.docs && ownerSnap.docs.length) {
					const batch = db.batch();
					ownerSnap.docs.forEach(refDoc => {
						if (refDoc.id === dog.id) return;
						const data = refDoc.data() || {};
						const sameCustomId = data.id && String(data.id) === String(dogId);
						const sameName = data.name && dog.name && String(data.name).trim().toLowerCase() === String(dog.name).trim().toLowerCase();
						if (sameCustomId || sameName) batch.delete(refDoc.ref);
					});
					await batch.commit();
					console.log('[DELETE /api/dogs/:dogId] deleted owner-similar Perro docs');
				}
			}
		} catch (err) {
			console.warn('Failed extra cleanup for owner duplicates of dog', dogId, err);
		}

		// Cascade delete related applications (best-effort)
		try {
			const appsSnap = await db.collection('Applications').where('dogId', '==', dogId).get();
			if (!appsSnap.empty) {
				const batch = db.batch();
				appsSnap.docs.forEach(d => batch.delete(d.ref));
				await batch.commit();
				console.log('[DELETE /api/dogs/:dogId] deleted related Applications', { count: appsSnap.size });
			}
		} catch (err) {
			console.warn('Failed deleting related applications for dog', dogId, err);
		}

		console.log('[DELETE /api/dogs/:dogId] success', { dogId });
		return res.json({ ok: true });
	} catch (err) {
		console.error('Error in DELETE /api/dogs/:dogId', err);
		return res.status(500).json({ error: 'internal' });
	}
});
