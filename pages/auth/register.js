import { useAuth } from '../../contexts/AuthContext';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('patient');
  const { signUp, loginWithGoogle } = useAuth();
  const router = useRouter();
  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle(role);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
      router.push('/dashboard');
    } catch (error) {
      setError('Failed to create an account');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="password-confirm">Confirm Password</label>
        <input
          type="password"
          id="password-confirm"
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        <div>
          <input
            type="radio"
            id="patient"
            name="role"
            value="patient"
            checked={role === 'patient'}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="patient">Patient</label>
        </div>

        <div>
          <input
            type="radio"
            id="therapist"
            name="role"
            value="therapist"
            checked={role === 'therapist'}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="therapist">Therapist</label>
        </div>

        <div>
          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            checked={role === 'admin'}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="admin">Admin</label>
        </div>

        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
      <div>
        <button onClick={handleLoginWithGoogle}>Register with Google</button>
      </div>
    </div>
  );
}
