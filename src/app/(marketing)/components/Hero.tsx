import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative w-full overflow-clip">
      <div className="mx-auto max-w-screen-xl">
        <div className="relative sm:overflow-hidden sm:rounded-2xl">
          <div className="relative px-6 py-10 sm:py-12 lg:px-8 lg:py-16">
            <div className="max-w-lg mx-auto">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">All your recipes</span>
                <span className="block">in one place</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl sm:max-w-3xl text-zinc-600">
                The easiest way to collect, organize and share all your favorite
                recipes from one place.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:gap-5 sm:space-y-0">
                <Link
                  href="/signup"
                  className="flex items-center justify-center rounded-full border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white sm:px-8"
                >
                  Get started for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
