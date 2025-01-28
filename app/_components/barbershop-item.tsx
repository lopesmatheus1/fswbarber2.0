import { StarIcon } from "lucide-react";
import { db } from "../_lib/prisma";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";

const BarbershopItem = () => {
  return (
    <Card className="relative max-w-[160px]">
      <CardContent className="p-2">
        <div className="relative h-[160px] w-full">
          <Image
            className="rounded-sm object-cover"
            src="https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png"
            fill
            alt={""}
          />
        </div>

        <Badge className="absolute left-3 top-3 flex gap-1">
          <StarIcon className="fill-current" size={12} />
          <p>5,0</p>
        </Badge>

        <div className="mt-2 px-3 text-left">
          <h2 className="text-sm font-semibold">FSW Barber</h2>
          <p className="text-xs text-muted-foreground">
            Avenida São Sebastião, 357, São Paulo
          </p>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-2">
        <Button className="w-full" variant={"secondary"}>
          Reservar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BarbershopItem;
