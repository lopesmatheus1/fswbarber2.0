import Link from "next/link";
import { quickSearchOption } from "../_constants/search";
import { getBookings } from "../_data-access/booking/get-bookings";
import { auth } from "../_lib/auth";
import SearchInput from "./search";
import { Button } from "./ui/button";
import Image from "next/image";
import BookingCard from "./booking-card";

const IntroductionHeroMobile = async () => {
  const session = await auth();
  const today = new Date();
  const bookings = await getBookings();
  return (
    <>
      <h2 className="text-xl">
        Olá,
        <span className="font-bold">
          {session?.user ? session?.user?.name?.split(" ")[0] : "bem vindo"}!
        </span>
      </h2>
      <p className="capitalize">
        {new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(today)},{" "}
        {new Intl.DateTimeFormat("pt-BR", {
          day: "numeric",
          month: "long",
        }).format(today)}
      </p>

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
          {bookings.length > 0 && (
            <>
              <h2 className="mb-1 text-muted-foreground">Agendamentos</h2>{" "}
              <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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
    </>
  );
};

export default IntroductionHeroMobile;
