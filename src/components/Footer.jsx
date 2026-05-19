import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                <div className="space-y-3">
          <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 font-bold text-xl text-amber-500">
            <span className="text-2xl">🐾</span> <span>PawsHome</span>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            Giving domestic shelter animals a second chance at living happily. Connect with us and find your perfect companion.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Connect With Me
          </h4>
          <div className="flex items-center space-x-6 text-2xl">
            {/* Facebook */}
            <a 
              href="https://facebook.com/your-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 dark:text-slate-400 hover:text-[#1877F2] dark:hover:text-[#1877F2] transition-all duration-300 hover:-translate-y-1"
              title="Facebook"
            >
              <FaFacebook size={26} />
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/your-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 dark:text-slate-400 hover:text-[#E4405F] dark:hover:text-[#E4405F] transition-all duration-300 hover:-translate-y-1"
              title="Instagram"
            >
              <FaInstagram size={26} />
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/your-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 dark:text-slate-400 hover:text-[#0077B5] dark:hover:text-[#0077B5] transition-all duration-300 hover:-translate-y-1"
              title="LinkedIn"
            >
              <FaLinkedin size={26} />
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/your-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 dark:text-slate-400 hover:text-[#24292e] dark:hover:text-white transition-all duration-300 hover:-translate-y-1"
              title="GitHub"
            >
              <FaGithub size={26} />
            </a>
          </div>
        </div>

        {/* ডান পাশ: কন্টাক্ট ও কপিরাইট */}
        <div className="space-y-2 md:text-right text-sm">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Contact Channels
          </h4>
          <p>support@pawshome.com</p>
          <p>+880 1234 567890</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 pt-2">
            PawsHome Adoption Platform © 2026
          </p>
        </div>

      </div>
    </footer>
  );
}