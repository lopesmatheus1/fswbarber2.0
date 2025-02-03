import BarbershopItem from "./_components/barbershop-item";
import {
  getBarberShops,
  getPopularBarberShops,
} from "./_data-access/barbershop/get-barbershop";
import Header from "./_components/header";
import IntroductionHeroMobile from "./_components/introduction-hero-mobile";
import DesktopHeroIntroduction from "./_components/desktop-hero-introduction";

export default async function Home() {
  const barbershops = await getBarberShops();
  const popularBarberShops = await getPopularBarberShops();

  return (
    <div>
      <Header />
      <div>
        {/* INTRODUÇÃO PARA MOBILE */}
        <div className="space-y-4 p-5 md:hidden">
          <IntroductionHeroMobile />
        </div>

        <DesktopHeroIntroduction />

        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10 backdrop-blur-sm"></div> */}

        {/* BABEARIAS */}
        <div className="px-5 md:px-12 lg:px-24 xl:px-32">
          <h2 className="mb-3 text-muted-foreground md:mb-5 md:text-xl md:font-bold md:text-white">
            Recomendados
          </h2>
          <div className="mb-6 flex gap-4 overflow-x-auto md:mb-10 md:min-h-[290px] [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem
                id={barbershop.id}
                address={barbershop.address}
                imageUrl={barbershop.imageUrl}
                name={barbershop.name}
                key={barbershop.id}
              />
            ))}
          </div>

          <h2 className="mb-3 text-muted-foreground md:text-xl md:font-bold md:text-white">
            Populares
          </h2>
          <div className="mb-12 flex gap-4 overflow-x-auto md:mb-24 md:min-h-[290px] [&::-webkit-scrollbar]:hidden">
            {popularBarberShops.map((barbershop) => (
              <BarbershopItem
                id={barbershop.id}
                address={barbershop.address}
                imageUrl={barbershop.imageUrl}
                name={barbershop.name}
                key={barbershop.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
