export default function Hero() {
  return (
    <div className="relative w-full overflow-clip pt-4">
      <div className="mx-auto max-w-screen-xl">
        <div className="relative sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0">
            <img
              alt="People working on laptops"
              src="/food-1.webp"
              className="absolute left-48 top-[-80px] w-60"
            />
            <img
              alt="People working on laptops"
              src="/food-2.webp"
              className="absolute left-8 bottom-[-200px] w-96"
            />
            <img
              alt="People working on laptops"
              src="/food-3.webp"
              className="absolute right-24 top-0 w-60"
            />
            <img
              alt="People working on laptops"
              src="/food-4.webp"
              className="absolute right-8 bottom-[-80px] w-60"
            />
            <div className="absolute inset-0 bg-[#F4F2F0] mix-blend-multiply" />
          </div>
          <div className="relative px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">Your digital</span>
              <span className="block">recipe book</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-xl sm:max-w-3xl text-zinc-600">
              Discover, create, and share your recipes.
            </p>
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-[#222222] px-4 py-3 text-base font-medium text-white sm:px-8"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-zinc-800 sm:px-8"
                >
                  See all recipes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
