import { getSession } from "next-auth/react";

interface ProtectedData {
  message: string; // Adapte a interface de acordo com a resposta do seu backend
  // ... outros campos
}

async function fetchProtectedData(): Promise<ProtectedData | null> {
  const session = await getSession();

  if (!session || !session.accessToken) {
    console.error("Sessão ou token JWT não encontrados.");
    return null;
  }

  const token = session.accessToken;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"; // Use uma variável de ambiente

  try {
    const res = await fetch(`${backendUrl}/api/protected`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error(`Erro na requisição: ${res.status} ${res.statusText}`);
      return null;
    }

    const data: ProtectedData = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao fazer requisição:", error);
    return null;
  }
}

export default fetchProtectedData;