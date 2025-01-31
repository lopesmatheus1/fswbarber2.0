import { Input } from "@/app/_components/ui/input";
import { Button } from "./_components/ui/button";
import { Search } from "lucide-react";
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

export default async function Home() {
  const barbershops = await getBarberShops();
  const popularBarberShops = await getPopularBarberShops();
  const session = await auth();
  const today = new Date();
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

        <div className="flex items-center justify-center gap-2">
          <Input placeholder="Buscar Barbearias" />
          <Button className="h-10 w-10">
            <Search size={18} />
          </Button>
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOption.map((quickSearch) => (
            <Button
              className="gap-2"
              variant={"secondary"}
              key={quickSearch.title}
            >
              <Image
                src={quickSearch.imageUrl}
                width={16}
                height={16}
                alt={quickSearch.title}
              />
              <p>{quickSearch.title}</p>
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
        <div>
          <h2 className="mb-1 text-muted-foreground">Agendamentos</h2>
          <BookingCard />
        </div>

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
