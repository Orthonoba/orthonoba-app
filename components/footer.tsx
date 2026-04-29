export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-center">
        <span className="text-sm text-gray-600">© {year} ORTHONOBA. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
