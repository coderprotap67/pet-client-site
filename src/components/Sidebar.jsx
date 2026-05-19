'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const links = [
    { name: 'My Listings', path: '/dashboard/my-listings' },
    { name: 'Add New Pet', path: '/dashboard/add-pet' },
    { name: 'My Requests', path: '/dashboard/my-requests' },
    { name: 'My Wishlist', path: '/dashboard/wishlist' },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-50 dark:bg-slate-900/50 p-6 space-y-2 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)]">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-4">Dashboard Core</h2>
      {links.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link key={link.path} href={link.path} className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${isActive ? 'bg-amber-500 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            {link.name}
          </Link>
        );
      })}
    </aside>
  );
}