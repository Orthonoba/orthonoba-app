import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-10 py-6 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Orthonoba</p>
      <p className="mt-1">Tecnología digital para ortodoncia</p>
    </footer>
  );
}
