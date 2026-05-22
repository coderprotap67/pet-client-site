export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      
      <aside className="w-64 hidden md:block border-r border-slate-200 dark:border-slate-800 p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <nav className="space-y-3">
          <a
            href="/dashboard/add-pet"
            className="block text-sm hover:text-amber-500"
          >
            Add Pet
          </a>

          <a
            href="/dashboard/my-requests"
            className="block text-sm hover:text-amber-500"
          >
            My Requests
          </a>

          <a
            href="/dashboard/my-listings"
            className="block text-sm hover:text-amber-500"
          >
            My Listings
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-5">
        {children}
      </main>
    </div>
  );
}