
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-festival-pink rounded-full flex items-center justify-center">
              <span className="font-script text-white text-2xl font-bold">A</span>
            </div>
            <span className="font-display font-bold text-xl">
              Anniversaire<span className="text-festival-pink">Party</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              <Link to="/" className="font-medium hover:text-festival-pink transition-colors">
                
              </Link>
              <Link to="/about" className="font-medium hover:text-festival-pink transition-colors">
                
              </Link>
              <Link to="/schedule" className="font-medium hover:text-festival-pink transition-colors">
                
              </Link>
              <Link to="/contact" className="font-medium hover:text-festival-pink transition-colors">
                
              </Link>
            </nav>
            
            {/*<Button 
              //onClick={() => navigate('/register')}
              //className="btn-primary"
            >
              S'inscrire
            </Button>*/}
          </div>
          
          {/*<button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-festival-pink" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>*/}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 border-t border-gray-100">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="font-medium py-2 hover:text-festival-pink transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/about" 
              className="font-medium py-2 hover:text-festival-pink transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              to="/schedule" 
              className="font-medium py-2 hover:text-festival-pink transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Programme
            </Link>
            <Link 
              to="/contact" 
              className="font-medium py-2 hover:text-festival-pink transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              onClick={() => {
                navigate('/register');
                setIsMenuOpen(false);
              }}
              className="btn-primary mt-2"
            >
              S'inscrire
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
