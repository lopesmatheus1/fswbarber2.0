import Header from "./_components/header";
import { Input } from "@/app/_components/ui/input";
import { Button } from "./_components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import BookingCard from "./_components/booking-card";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-xl">
            Olá, <span className="font-bold">Matheus</span>
          </h2>
          <p>Terça, 27 de janeiro</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Input placeholder="Buscar Barbearias" />
          <Button className="h-10 w-10">
            <Search size={18} />
          </Button>
        </div>

        <div className="relative h-[150px] w-full">
          <Image
            src={"/Banner1.png"}
            fill
            className="rounded-xl object-cover"
            alt={"Agende nos melhores com FSW barber"}
          />
        </div>

        <div>
          <h2 className="mb-1 text-muted-foreground">Agendamentos</h2>
          <BookingCard />
        </div>
      </div>
    </div>
  );
}
