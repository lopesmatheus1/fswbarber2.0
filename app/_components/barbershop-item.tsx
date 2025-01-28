import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface BarbershopItemProps {
  imageUrl: string;
  name: string;
  address: string;
}

const BarbershopItem = ({ address, imageUrl, name }: BarbershopItemProps) => {
  return (
    <Card className="relative min-w-[170px]">
      <CardContent className="h-full p-2">
        <div className="relative h-[160px] w-full">
          <Image
            className="rounded-sm object-cover"
            src={imageUrl}
            fill
            alt={""}
          />
          <Badge className="absolute left-1 top-1 flex gap-1 bg-primary/70">
            <StarIcon className="fill-current" size={12} />
            <p>5,0</p>
          </Badge>
        </div>

        <div className="mt-2 truncate px-3 text-left">
          <h2 className="text-sm font-semibold">{name}</h2>
          <p className="text-xs text-muted-foreground">{address}</p>
        </div>

        <Button className="mt-3 w-full" variant={"secondary"}>
          Reservar
        </Button>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
