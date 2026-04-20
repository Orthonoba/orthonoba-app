import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <Link href="/login" className="text-xl underline">
        Ir a Login
      </Link>

      <Link href="/register" className="text-xl underline">
        Ir a Register
      </Link>
    </main>
  );
}
