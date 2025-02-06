import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <hgroup>
            <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Start building your digital recipe book
            </p>
          </hgroup>
          <div className="mt-8 flex justify-center">
            <Link
              href="/signup"
              className="flex items-center justify-center rounded-full border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white sm:px-8"
            >
              Get started for free
            </Link>
          </div>
        </div>
        <div className="mt-24 border-t border-gray-900/10 pt-12 flex flex-col">
          <img alt="Company name" src="/app-logo.svg" className="h-9" />
        </div>
      </div>
    </footer>
  );
}
