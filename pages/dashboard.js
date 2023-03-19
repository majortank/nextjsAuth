import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  // Redirect to login page if user is not authenticated
  if (!currentUser) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div>
      <h1>Welcome, {currentUser.email}!</h1>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
