'use client';

import Link from 'next/link';
import { sendResetPasswordEmail } from '../actions';
import { useActionState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ForgotPassword() {
  const [state, formAction, isPending] = useActionState(
    sendResetPasswordEmail,
    {
      error: '',
      success: '',
    },
  );

  const { error, success } = state;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center text-center">
        <h1 className="font-semibold text-xl">
          {success ? 'Check your email' : 'Forgot password?'}
        </h1>
        <p>
          {' '}
          {success
            ? `${success}`
            : "No worries, we'll send you email instructions"}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction} method="POST" className="space-y-6">
          {error && (
            <div className="text-red-500 text-sm">
              {error || 'Something went wrong. Please try again.'}
            </div>
          )}
          {!success && ( // Hide the form if email was sent successfully
            <>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-sm ${
                  isPending
                    ? 'bg-gray-400 text-gray-300 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-500'
                }`}
              >
                {isPending ? 'Sending...' : 'Send email instructions'}
              </button>
            </>
          )}
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            <Link
              href="/login"
              className="font-semibold text-green-600 hover:text-green-700 flex items-center justify-center gap-1"
            >
              <ArrowLeftIcon className="w-4" />
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
