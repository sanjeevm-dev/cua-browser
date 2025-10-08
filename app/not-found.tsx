export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-black text-white p-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold mb-2">Page not found</h1>
        <p className="text-sm text-gray-400">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="inline-block mt-6 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition">Go home</a>
      </div>
    </div>
  );
}

