'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../../utils/supabase/client';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(`Error: ${error.message}`);
    } else {
      setSuccess('Password has been reset successfully!');
      setTimeout(() => router.push('/login'), 2000); // Redirect to login page
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handlePasswordReset}
          className="space-y-4 w-full max-w-sm"
        >
          <label htmlFor="password" className="block text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Reset Password
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">{success}</p>}
      </div>
    </div>
  );
}
