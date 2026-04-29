export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">ORTHONOBA</h1>
        <p className="text-gray-600 text-lg mb-8">Plataforma de gestión dental</p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </a>
          <a
            href="/register"
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
}
