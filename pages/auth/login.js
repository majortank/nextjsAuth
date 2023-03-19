import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password, role);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle(role);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type="radio"
            name="role"
            value="patient"
            checked={role === 'patient'}
            onChange={(e) => setRole(e.target.value)}
          />
          Patient
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="therapist"
            checked={role === 'therapist'}
            onChange={(e) => setRole(e.target.value)}
          />
          Therapist
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === 'admin'}
            onChange={(e) => setRole(e.target.value)}
          />
          Admin
        </label>
        <button type="submit">Log In</button>
      </form>
      <div>
        <button onClick={handleLoginWithGoogle}>Log in with Google</button>
        <label>
          <input
            type="radio"
            name="role"
            value="patient"
            checked={role === 'patient'}
            onChange={(e) => setRole(e.target.value)}
          />
          Patient
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="therapist"
            checked={role === 'therapist'}
            onChange={(e) => setRole(e.target.value)}
          />
          Therapist
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === 'admin'}
            onChange={(e) => setRole(e.target.value)}
          />
          Admin
        </label>
      </div>
    </>
  );
}
