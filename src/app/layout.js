import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MyThemeProvider from '../components/MyThemeProvider';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'PawsHome - Pet Adoption System',
  description: 'Find your perfect animal companion today.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-300">

        <MyThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </AuthProvider>
        </MyThemeProvider>

      </body>
    </html>
  );
}