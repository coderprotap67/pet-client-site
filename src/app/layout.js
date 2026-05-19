 import './globals.css'; // নিশ্চিত করুন যে আপনার tailwind ডিরেক্টিভস এখানে আছে
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';

export const metadata = {
  title: 'PawsHome - Pet Adoption System',
  description: 'Find your perfect animal companion today.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}