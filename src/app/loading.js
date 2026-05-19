export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-900 flex flex-col justify-center items-center z-50">
      <div className="text-6xl animate-bounce mb-4">🐾</div>
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide">Fetching metadata, please wait...</p>
    </div>
  );
}