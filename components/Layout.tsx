import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LayoutDashboard, Upload, FileQuestion, LogOut, Menu, X, HelpCircle } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path ? 'text-cyan-400' : 'text-slate-300 hover:text-white';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                AE GPT
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8 font-medium">
                {user ? (
                  <>
                    <Link to="/dashboard" className={`flex items-center space-x-1 ${isActive('/dashboard')}`}>
                      <LayoutDashboard size={18} /> <span>Dashboard</span>
                    </Link>
                    <Link to="/ask" className={`flex items-center space-x-1 ${isActive('/ask')}`}>
                      <FileQuestion size={18} /> <span>Ask</span>
                    </Link>
                    <Link to="/upload" className={`flex items-center space-x-1 ${isActive('/upload')}`}>
                      <Upload size={18} /> <span>Upload PDF</span>
                    </Link>
                    <Link to="/explainer" className={`flex items-center space-x-1 ${isActive('/explainer')}`}>
                      <HelpCircle size={18} /> <span>Explainer</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/" className={isActive('/')}>Home</Link>
                    <Link to="/login" className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md text-white transition-colors">
                      Login / Signup
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* User Actions (Desktop) */}
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-xs text-right">
                  <p className="text-slate-300">Logged in as</p>
                  <p className="font-bold text-cyan-400">{user.name}</p>
                </div>
                <button onClick={logout} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-red-400 transition">
                  <LogOut size={20} />
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">Dashboard</Link>
                  <Link to="/ask" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">Ask Question</Link>
                  <Link to="/upload" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">Upload PDF</Link>
                  <Link to="/explainer" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">AI Explainer</Link>
                  <button onClick={logout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-slate-700">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">Home</Link>
                  <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-cyan-400 hover:bg-slate-700">Login</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 AE GPT. Free Test Mode Enabled.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;