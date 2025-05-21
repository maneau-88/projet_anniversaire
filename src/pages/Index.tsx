
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import PromotionPopup from '@/components/PromotionPopup';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Assuming the event date is 2 months from now
  useEffect(() => {
    const eventDate = new Date();
    eventDate.setMonth(eventDate.getMonth() + 2);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-confetti-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Célébrons Ensemble un <span className="gradient-text">Anniversaire Inoubliable</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Rejoignez-nous pour une journée pleine de joie, de rires et de moments précieux à partager avec vos proches.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => navigate('/register')}
                className="btn-primary text-lg"
              >
                S'inscrire maintenant
              </Button>
              {/*<Button 
                onClick={() => navigate('/schedule')}
                variant="outline"
                className="border-festival-purple text-festival-purple hover:bg-festival-purple/5 text-lg"
              >
                Voir le programme
              </Button>*/}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Jours', value: countdown.days },
                { label: 'Heures', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Secondes', value: countdown.seconds },
              ].map((item, index) => (
                <div key={index} className="festival-card py-4">
                  <div className="text-3xl md:text-4xl font-bold text-festival-pink">{item.value}</div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Details Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-festival-purple/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Détails de l'Événement</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour profiter au maximum de cette journée spéciale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="festival-card flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-full bg-festival-pink/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-festival-pink" />
              </div>
              <h3 className="font-bold text-xl mb-2">Date</h3>
              <p className="text-gray-600">15 Août 2025</p>
            </div>
            
            <div className="festival-card flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-full bg-festival-purple/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-festival-purple" />
              </div>
              <h3 className="font-bold text-xl mb-2">Heure</h3>
              <p className="text-gray-600">De 14h00 à 23h00</p>
            </div>
            
            <div className="festival-card flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-full bg-festival-blue/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-festival-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Lieu</h3>
              <p className="text-gray-600">Salle des Fêtes<br />Etoile D'Or Sablière, Libreville</p>
            </div>
            
            <div className="festival-card flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-full bg-festival-yellow/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-festival-yellow" />
              </div>
              <h3 className="font-bold text-xl mb-2">Invités</h3>
              <p className="text-gray-600">Capacité limitée à 100 personnes</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Program Highlights */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Programme</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une journée remplie d'activités pour tous les âges et toutes les envies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="festival-card p-0 overflow-hidden flex flex-col">
              <div className="h-48 bg-festival-pink/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-festival-pink">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Jeux & Activités</h3>
                <p className="text-gray-600 mb-4">
                  Profitez de nos jeux et animations pour tous les âges. Des défis amusants aux activités ludiques.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-festival-pink"></div>
                    <span>Jeux d'extérieur</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-festival-pink"></div>
                    <span>Challenges en équipe</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-festival-pink"></div>
                    <span>Animation pour enfants</span>
                  </li>
                </ul>
                <div className="text-sm font-semibold text-festival-pink">14h00 - 17h00</div>
              </div>
            </div>
            
            <div className="festival-card p-0 overflow-hidden flex flex-col">
              <div className="h-48 bg-festival-purple/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-festival-purple">
                    <path d="M15 11l3.75 2.4a.5.5 0 010 .85L15 16.5"/>
                    <path d="M2 11l3.75-2.4a.5.5 0 000-.85L2 5"/>
                    <path d="M18.8 4A2.8 2.8 0 0021 2"/>
                    <path d="M21 16a3 3 0 000 6"/>
                    <path d="M21 22v-6"/>
                    <path d="M3 18a3 3 0 003-3m0 0v-2m0 0a3 3 0 10-3-3"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Dîner & Soirée</h3>
                <p className="text-gray-600 mb-4">
                  Un dîner de gala suivi d'une soirée dansante avec DJ pour célébrer dans une ambiance festive.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-festival-purple"></div>
                    <span>Buffet gastronomique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-festival-purple"></div>
                    <span>Animation musicale</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-festival-purple"></div>
                    <span>Piste de danse</span>
                  </li>
                </ul>
                <div className="text-sm font-semibold text-festival-purple">19h00 - 23h00</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            {/*<Button 
              onClick={() => navigate('/schedule')}
              variant="outline"
              className="border-festival-blue text-festival-blue hover:bg-festival-blue/5"
            >
              Programme complet
            </Button>*/}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-festival-pink/20 to-festival-purple/20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Rejoindre la Fête ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Ne manquez pas cet événement unique. Inscrivez-vous dès maintenant et soyez parmi les premiers à recevoir tous les détails exclusifs.
            </p>
            <Button 
              onClick={() => navigate('/register')}
              className="btn-primary text-lg px-8 py-6"
            >
              S'inscrire Maintenant
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Places limitées. Réservation obligatoire.
            </p>
          </div>
        </div>
      </section>
      
      <PromotionPopup delayBeforeShow={9000} />
      <Footer />
    </div>
  );
};

export default Index;
