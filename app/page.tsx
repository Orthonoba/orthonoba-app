import Link from "next/link";

export default function Page() {
  return (
    <div className="p-10 space-y-4">
      <Link href="/login">Ir a Login</Link>
      <br />
      <Link href="/register">Ir a Register</Link>
    </div>
  );
}
