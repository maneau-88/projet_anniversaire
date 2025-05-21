
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  code: string;
  role: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
    } else {
      // Redirect to login if not logged in
      toast({
        title: "Authentication requise",
        description: "Veuillez vous connecter pour accéder à cette page.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès."
    });
    navigate('/login');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Mon Espace</h1>
              <p className="text-gray-600">
                Bienvenue, {currentUser.firstName} !
              </p>
            </div>
            
            <Button onClick={handleLogout} variant="outline" className="self-start">
              Se déconnecter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="festival-card">
              <h2 className="text-xl font-bold mb-4">Mes informations</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nom complet</p>
                  <p>{currentUser.firstName} {currentUser.lastName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{currentUser.email}</p>
                </div>
                
                {currentUser.phone && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Téléphone</p>
                    <p>{currentUser.phone}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Statut</p>
                  <div className="mt-1">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      currentUser.role === 'admin' 
                        ? 'bg-festival-blue/20 text-festival-blue' 
                        : 'bg-festival-pink/20 text-festival-pink'
                    }`}>
                      {currentUser.role === 'admin' ? 'Administrateur' : 'Participant'}
                    </span>
                  </div>
                </div>
                
                {currentUser.role === 'admin' && (
                  <div className="pt-2">
                    <Button 
                      onClick={() => navigate('/admin')}
                      className="bg-festival-purple hover:bg-festival-purple/90"
                    >
                      Panneau d'administration
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="festival-card">
              <h2 className="text-xl font-bold mb-4">Mon code d'accès</h2>
              
              <div className="bg-gradient-to-r from-festival-purple/10 to-festival-pink/10 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Votre code unique pour l'événement</p>
                <div className="font-mono text-3xl font-bold tracking-wider text-festival-purple mb-4">
                  {currentUser.code}
                </div>
                <p className="text-xs text-gray-500">
                  Conservez ce code précieusement, il vous sera demandé à l'entrée.
                </p>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Comment utiliser votre code ?</h3>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-festival-pink/20 text-festival-pink flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm">Présentez votre code à l'entrée de l'événement.</p>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-festival-pink/20 text-festival-pink flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm">Notre équipe vérifiera votre inscription.</p>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-festival-pink/20 text-festival-pink flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm">Profitez de l'événement !</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 festival-card bg-gradient-to-r from-festival-yellow/10 to-festival-blue/10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:flex-1">
                <h2 className="text-xl font-bold mb-2">Vous êtes prêt pour la fête ?</h2>
                <p className="text-gray-600">
                  N'oubliez pas de vérifier le programme complet de l'événement pour ne rien manquer !
                </p>
              </div>
              <div>
                <Button 
                  onClick={() => navigate('/schedule')}
                  className="bg-festival-blue hover:bg-festival-blue/90"
                >
                  Voir le programme
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
