import { Button } from "@/app/_components/ui/button";
import { getUniqueBarberShop } from "@/app/_data-access/barbershop/get-barbershop";
import Image from "next/image";
import { ChevronLeft, MenuIcon, } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import SidebarSheetContent from "@/app/_components/sidebar-sheet-content";
import ServiceCard from "./_components/service-card";
import CellphoneItem from "./_components/cellphone-item";

interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await getUniqueBarberShop(params.id);

  if (!barbershop) return;
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          className="object-cover"
          fill
          alt={"Imagem da barbearia"}
        />

        <Button
          asChild
          variant={"secondary"}
          size={"icon"}
          className="z-200 absolute left-3 top-3 p-0"
        >
          <Link href={"/"}>
            <ChevronLeft size={20} />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="z-200 absolute right-3 top-3 p-0"
              variant={"secondary"}
              size={"icon"}
            >
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>
          <SidebarSheetContent />
        </Sheet>
      </div>

      {/* INFORMAÇÕES */}
      <div className="border-b p-5">
        <h2 className="mb-3 text-xl font-bold">{barbershop.name}</h2>
        <div className="mb-2 flex gap-2">
          <Image
            src={"/map-pin.svg"}
            width={16}
            height={16}
            alt={"Endereço da barbearia"}
          />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex gap-2">
          <Image
            src={"/Star.svg"}
            width={16}
            height={16}
            alt={"Endereço da barbearia"}
          />
          <p className="text-sm">5,0 (899) avaliações</p>
        </div>
      </div>

      {/* ABOUT */}
      <div className="border-b p-5 text-left">
        <h2 className="mb-3 text-sm text-muted-foreground">Sobre nós</h2>
        <p className="text-sm">{barbershop.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="border-b p-5">
        <h2 className="mb-3 text-sm text-muted-foreground">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((serivce) => (
            <ServiceCard
              imageUrl={serivce.imageUrl}
              service={serivce.name}
              text={serivce.description}
              price={Number(serivce.price)}
            />
          ))}
        </div>

        {/* CONTATOS */}
        <div className="p-5 pb-10">
          <h2 className="mb-3 text-sm text-muted-foreground">Contatos</h2>
          {barbershop.phones.map((phone, i) => (
            <CellphoneItem phone={phone} key={`${phone}-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;
