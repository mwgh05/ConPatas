"use client";
import { useEffect, useState } from "react";
import { getCollectionData, getChatsByEmail, getChatMessages, getDogs } from "../firestoreService";
import Image from "next/image";
/*
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}*/

export default function Home() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<{ [chatId: number]: any[] }>({});
  const [dogs, setDogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsuarios() {
      const data = await getCollectionData("Usuario"); // or "Usuarios"
      setUsuarios(data);
    }
    fetchUsuarios();
    async function fetchChatsAndMessages() {
      const userEmail = "usuario@gmail.com"; // <-- change to your user email
      const chatsData = await getChatsByEmail(userEmail);
      setChats(chatsData);

      // Fetch messages for each chat
      const messagesData: { [chatId: number]: any[] } = {};
      for (const chat of chatsData) {
        const chatMsgs = await getChatMessages(chat.id); // chat.id should be the chat ID
        messagesData[chat.id] = chatMsgs;
      }
      setMessages(messagesData);
    }
    fetchChatsAndMessages();
    async function fetchDogs() {
      const dogsData = await getDogs();
      setDogs(dogsData);
    }
    fetchDogs();
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.correo ? usuario.correo : "Sin correo"}
          </li>
        ))}
      </ul>
      <h1>Chats</h1>
      {chats.map(chat => (
        <div key={chat.id} style={{ marginBottom: "2rem" }}>
          <h2>Chat ID: {chat.id}</h2>
          <p>Usuario 1: {chat.usuario1}</p>
          <p>Usuario 2: {chat.usuario2}</p>
          <h3>Mensajes:</h3>
          <ul>
            {(messages[chat.id] || []).map(msg => (
              <li key={msg.id}>
                <strong>{msg.emisor}:</strong> {msg.mensaje}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h1>Perros</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {dogs.map(dog => (
          <div key={dog.id} style={{ border: "1px solid #ccc", padding: "1rem", width: "300px" }}>
            <img src={dog.foto} alt={dog.nombre} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <h2>{dog.nombre}</h2>
            <p><strong>Edad:</strong> {dog.edad}</p>
            <p><strong>Peso:</strong> {dog.peso} kg</p>
            <p><strong>Tamaño:</strong> {dog.tamano}</p>
            <p><strong>Comportamiento:</strong> {dog.comportamiento}</p>
            <p><strong>Descripción:</strong> {dog.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}