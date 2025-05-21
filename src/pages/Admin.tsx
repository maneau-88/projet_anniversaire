
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is logged in and is an admin
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      
      if (user.role !== 'admin') {
        // Redirect non-admin users
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les droits pour accéder à cette page.",
          variant: "destructive"
        });
        navigate('/');
      }
    } else {
      // Redirect to login if not logged in
      toast({
        title: "Authentication requise",
        description: "Veuillez vous connecter pour accéder à cette page.",
        variant: "destructive"
      });
      navigate('/login');
    }
    
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, [navigate, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès."
    });
    navigate('/login');
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    return (
      fullName.includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.code.toLowerCase().includes(searchLower)
    );
  });
  
  const makeAdmin = (userId: number) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, role: 'admin' };
      }
      return user;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    toast({
      title: "Rôle modifié",
      description: "L'utilisateur est maintenant administrateur."
    });
  };
  
  const removeAdmin = (userId: number) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, role: 'participant' };
      }
      return user;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    toast({
      title: "Rôle modifié",
      description: "L'utilisateur n'est plus administrateur."
    });
  };
  
  const deleteUser = (userId: number) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès."
    });
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="flex-1 py-20 px-4">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Panneau d'Administration</h1>
              <p className="text-gray-600">
                Bienvenue, {currentUser.firstName} {currentUser.lastName}
              </p>
            </div>
            
            <Button onClick={handleLogout} variant="outline" className="self-start">
              Se déconnecter
            </Button>
          </div>
          
          <div className="festival-card mb-8">
            <h2 className="text-xl font-bold mb-4">Gestion des Participants</h2>
            
            <div className="mb-6">
              <Label htmlFor="search" className="sr-only">Recherche</Label>
              <Input
                id="search"
                placeholder="Rechercher par nom, email ou code..."
                value={searchTerm}
                onChange={handleSearch}
                className="max-w-md"
              />
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className="bg-festival-purple/10 text-festival-purple px-2 py-1 rounded-md font-mono text-sm">
                            {user.code}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' 
                              ? 'bg-festival-blue/20 text-festival-blue' 
                              : 'bg-festival-pink/20 text-festival-pink'
                          }`}>
                            {user.role === 'admin' ? 'Administrateur' : 'Participant'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {user.role === 'admin' ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => removeAdmin(user.id)}
                              >
                                Révoquer Admin
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => makeAdmin(user.id)}
                              >
                                Faire Admin
                              </Button>
                            )}
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteUser(user.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        {searchTerm 
                          ? 'Aucun résultat trouvé pour cette recherche.' 
                          : 'Aucun utilisateur enregistré.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="festival-card">
              <h3 className="font-semibold text-gray-500 mb-1">Total Participants</h3>
              <p className="text-3xl font-bold">{users.filter(u => u.role === 'participant').length}</p>
            </div>
            
            <div className="festival-card">
              <h3 className="font-semibold text-gray-500 mb-1">Administrateurs</h3>
              <p className="text-3xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
            </div>
            
            <div className="festival-card">
              <h3 className="font-semibold text-gray-500 mb-1">Utilisateurs Totaux</h3>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Admin;
