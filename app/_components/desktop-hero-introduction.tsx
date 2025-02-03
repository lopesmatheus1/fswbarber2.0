import Image from "next/image";

import BookingCard from "./booking-card";
import { getBookings } from "../_data-access/booking/get-bookings";
import { auth } from "../_lib/auth";
import BarbershopItem from "./barbershop-item";
import SearchInput from "./search";
import { getBarberShops } from "../_data-access/barbershop/get-barbershop";

const DesktopHeroIntroduction = async () => {
  const session = await auth();
  const today = new Date();
  const bookings = await getBookings();
  const barbershops = await getBarberShops();

  return (
    <div className="relative z-0 mb-4 flex min-h-[500px] w-full items-center justify-between gap-28 px-32 max-md:hidden md:px-12 lg:px-24 xl:px-32">
      <Image
        alt="Imagem de introdução"
        quality={100}
        src="/DesktopImage.jpg"
        fill
        className="object-cover object-top grayscale"
      />

      <div className="z-50 flex min-h-[320px] w-full flex-col justify-around text-start">
        <div>
          <h2 className="text-xl">
            Olá,{" "}
            <span className="font-bold">
              {session?.user ? session?.user?.name?.split(" ")[0] : "bem vindo"}
              !
            </span>
          </h2>
          <p className="capitalize">
            {new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(
              today,
            )}
            ,{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              day: "numeric",
              month: "long",
            }).format(today)}
          </p>
        </div>

        <SearchInput />

        <div className="w-full">
          {session ? (
            <div>
              {bookings.length > 0 && (
                <>
                  <h2 className="mb-1 text-muted-foreground">Agendamentos</h2>
                  <div className="flex max-h-[100px] flex-col gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    {bookings.map((booking) => (
                      <BookingCard
                        booking={JSON.parse(JSON.stringify(booking))}
                        key={booking.id}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="z-50 flex min-h-[320px] flex-col justify-between">
        <h2 className="text-lg font-bold">Populares</h2>
        <div className="flex gap-4 overflow-x-auto sm:w-[300px] lg:w-[400px] xl:w-[500px] 2xl:w-[700px] [&::-webkit-scrollbar]:hidden">
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
      </div>
    </div>
  );
};

export default DesktopHeroIntroduction;
