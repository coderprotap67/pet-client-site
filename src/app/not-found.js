import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center text-center px-4">
      <span className="text-8xl mb-4"></span>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">404 - Page Discovered Missing</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md">The page you are looking for has wandered off or never existed. Let's get you back home.</p>
      <Link href="/" className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition">
        Back to Home 
      </Link>
    </div>
  );
}