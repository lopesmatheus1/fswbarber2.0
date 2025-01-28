import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/currency";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  imageUrl: string;
  service: string;
  text: string;
  price: number;
}

const ServiceCard = ({ imageUrl, price, service, text }: ServiceCardProps) => {
  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            className="rounded-lg object-cover"
            src={imageUrl}
            fill
            alt="Imagem do serviço prestado"
            quality={100} // Mantém boa qualidade
          />
        </div>

        <div className="flex flex-col justify-between">
          <h2 className="text-sm font-bold">{service}</h2>
          <p className="text-sm text-muted-foreground">{text}</p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">
              {formatCurrency(price)}
            </p>
            <Button variant={"secondary"} size={"sm"}>
              <Link href={"/"}>Reservar</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
