import { Button } from "./_components/ui/button";
import Image from "next/image";
import BookingCard from "./_components/booking-card";
import BarbershopItem from "./_components/barbershop-item";
import {
  getBarberShops,
  getPopularBarberShops,
} from "./_data-access/barbershop/get-barbershop";
import { quickSearchOption } from "./_constants/search";
import Header from "./_components/header";
import { auth } from "./_lib/auth";
import SearchInput from "./_components/search";
import Link from "next/link";
import { getBookings } from "./_data-access/booking/get-bookings";

export default async function Home() {
  const barbershops = await getBarberShops();
  const popularBarberShops = await getPopularBarberShops();
  const session = await auth();
  const today = new Date();
  const bookings = await getBookings();

  return (
    <div>
      <Header />
      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-xl">
            Olá,{" "}
            <span className="font-bold">
              {session?.user?.name?.split(" ")[0]}
            </span>
          </h2>
          <p>
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

        {/* INPUT PARA BUSCA RÁPIDA */}
        <SearchInput />

        {/* BUSCA RÁPIDA */}
        <div className="flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOption.map((quickSearch) => (
            <Button
              asChild
              className="gap-2"
              variant={"secondary"}
              key={quickSearch.title}
            >
              <Link href={`/barbershop?service=${quickSearch.title}`}>
                <Image
                  src={quickSearch.imageUrl}
                  width={16}
                  height={16}
                  alt={quickSearch.title}
                />
                <p>{quickSearch.title}</p>
              </Link>
            </Button>
          ))}
        </div>

        {/* BANNER */}
        <div className="relative h-[150px] w-full">
          <Image
            src={"/Banner1.png"}
            fill
            className="rounded-xl object-cover"
            alt={"Agende nos melhores com FSW barber"}
          />
        </div>

        {/* AGENDAMENTOS */}

        {session ? (
          <div>
            <h2 className="mb-1 text-muted-foreground">Agendamentos</h2>{" "}
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {bookings.map((booking) => (
                <BookingCard booking={booking} key={booking.id} />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* BABEARIAS */}
        <div>
          <h2 className="mb-1 text-muted-foreground">Recomendados</h2>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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

          <h2 className="mb-1 mt-2 text-muted-foreground">Populares</h2>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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
