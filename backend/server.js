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
			createdAt: admin.firestore.FieldValue.serverTimestamp()
		});

		return res.json({ ok: true });
	} catch (err) {
		console.error('Error in /api/applications', err);
		return res.status(500).json({ error: 'internal' });
	}
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend listening on', PORT));
