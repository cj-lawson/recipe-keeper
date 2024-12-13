import Hero from "./components/marketing/home/Hero";
import FeaturedRecipes from "./components/marketing/home/FeaturedRecipes";
import HealthyRecipes from "./components/marketing/home/HealthyRecipes";
import Footer from "./components/marketing/shared/Footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-items-center min-h-screen min-w-screen-xl p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        <FeaturedRecipes />
        <HealthyRecipes />
      </main>
      <Footer />
    </div>
  );
}
