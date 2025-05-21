
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromotionPopupProps {
  delayBeforeShow?: number; // in milliseconds
}

const PromotionPopup: React.FC<PromotionPopupProps> = ({ delayBeforeShow = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if popup was already shown
    const popupShown = localStorage.getItem('promotionPopupShown');
    
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Remember that we've shown the popup
        localStorage.setItem('promotionPopupShown', 'true');
      }, delayBeforeShow);
      
      return () => clearTimeout(timer);
    }
  }, [delayBeforeShow]);
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative w-full max-w-md festival-card overflow-hidden">
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
        >
          <X size={18} />
        </button>
        
        <div className="absolute top-0 right-0 w-24 h-24 bg-festival-yellow/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-festival-blue/20 rounded-full translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="text-center p-6">
          <h2 className="font-script text-3xl text-festival-pink mb-2">Offre Spéciale !</h2>
          <h3 className="font-display text-xl font-bold mb-4">Réservez avant le 15 Juin</h3>
          
          <div className="bg-gradient-to-r from-festival-purple/10 to-festival-blue/10 p-4 rounded-lg mb-6">
            <p className="text-lg font-semibold mb-1">
              <span className="text-festival-pink">20%</span> de réduction
            </p>
            <p className="text-gray-600">
              Utilisez le code <span className="font-semibold bg-white px-2 py-1 rounded">EARLY20</span>
            </p>
          </div>
          
          <p className="mb-6 text-gray-600">Ne manquez pas cette opportunité de célébrer avec nous à prix réduit!</p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => {
                navigate('/register');
                handleClose();
              }}
              className="btn-primary"
            >
              S'inscrire maintenant
            </Button>
            <Button 
              onClick={handleClose}
              variant="outline"
              className="border-festival-pink text-festival-pink hover:bg-festival-pink/5"
            >
              Plus tard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionPopup;
