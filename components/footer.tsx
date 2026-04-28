export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center">
        <span className="text-xs text-slate-500">© {year} ORTHONOBA</span>
      </div>
    </footer>
  );
}
