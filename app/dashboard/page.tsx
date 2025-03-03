"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded-md mb-4"
      >
        Logout
      </button>
      <ul className="bg-gray-800 p-4 rounded-md shadow-md">
        {users.map((user) => (
          <li key={user.id} className="p-2 border-b border-gray-700">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
