'use client';

import { useActionState, useState } from 'react';
import { signup } from '../actions';
import Link from 'next/link';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { signUpSchema } from '@utils/zodSchemas';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function signUp() {
  const [lastResult, action] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-emerald-600">
          Join BiteClub
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                key={fields.email.key}
                id="email"
                name={fields.email.name}
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="relative mt-2">
              <input
                key={fields.password.key}
                name={fields.password.name}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="at least 6 characters"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-4" />
                ) : (
                  <EyeIcon className="w-4" />
                )}
              </button>
            </div>
            <p className="text-red-500 mt-2">{fields.password.errors}</p>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create free account
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          already a member?{' '}
          <Link
            href="/login"
            className="font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Log in to your account
          </Link>
        </p>
      </div>
    </div>
  );
}
