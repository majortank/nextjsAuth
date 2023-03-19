import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState('');

  // Redirect to login page if user is not authenticated
  if (!currentUser) {
    router.push('/auth/login');
    return null;
  }

  useEffect(() => {
    const getUserRole = async () => {
      if (currentUser) {
        const userDoc = await firestore
          .collection('users')
          .doc(currentUser.uid)
          .get();
        setRole(userDoc.data().role);
      }
    };

    getUserRole();
  }, [currentUser]);

  return (
    <div>
      <h1>Welcome, {currentUser.email}!</h1>
      {role ? <p>You are logged in as a {role}</p> : <p>Loading...</p>}
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
