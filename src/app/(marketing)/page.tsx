import Hero from './components/Hero';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col justify-items-center min-h-screen min-w-screen-xl px-3 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        <div className="mx-auto">
          <Image
            width={738}
            height={358}
            src="hero-top-img.svg"
            alt="Biteclube logo mark"
          />
        </div>
      </main>
    </div>
  );
}
