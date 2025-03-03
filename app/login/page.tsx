"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (session) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        router.push("/dashboard");
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [session, router]);

  if (session) {
    return <p>logged in, Redirecting you in {countdown}...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Sign in with Google
      </button>
    </div>
  );
}
