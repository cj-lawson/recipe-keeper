'use client';

import { useState, useActionState } from 'react';
import { login } from '../actions';
import Link from 'next/link';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { logInSchema } from '@utils/zodSchemas';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default function Login() {
  const [lastResult, action] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: logInSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    defaultNoValidate: true,
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl/9 font-bold tracking-tight text-green-600">
          Log into BiteClub
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {lastResult?.status && (
          <div className="flex items-center bg-red-100 border border-red-300 rounded-md px-3 py-3 gap-2 text-red-500">
            <ExclamationCircleIcon className="w-4" />
            <p className="">{fields.email.errors}</p>
          </div>
        )}
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
                id="email"
                key={fields.email.key}
                name={fields.email.name}
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
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
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-green-600 hover:text-green-700"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="relative mt-2">
              <input
                id="password"
                key={fields.password.key}
                name={fields.password.name}
                required
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
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
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member yet?{' '}
          <Link
            href="/signup"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Create a free account
          </Link>
        </p>
      </div>
    </div>
  );
}
