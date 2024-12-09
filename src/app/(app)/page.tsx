import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-items-center min-h-screen min-w-screen-xl p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Hero card */}
        <div className="relative w-full overflow-clip">
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
                  <span className="block">Create beautiful</span>
                  <span className="block">sharable recipes</span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl sm:max-w-3xl text-zinc-600">
                  The easy to use, recipe maker for cooking incluencers,
                  bloggers, and home cooks
                </p>
                <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-[#132a13] hover:bg-[#31572c] px-4 py-3 text-base font-medium text-white hover:bg-indigo-50 sm:px-8"
                    >
                      Get started
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-zinc-800 hover:bg-[#90a955] sm:px-8"
                    >
                      Live demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
