import { format, isFuture } from "date-fns";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";

interface BookingCardProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } };
  }>;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const date = new Date(booking.date);
  const isConfirmed = isFuture(date);
  return (
    <Card className="min-w-[85%]">
      <CardContent className="flex justify-between p-0">
        <div className="my-2 space-y-1 pl-3">
          <Badge variant={`${isConfirmed ? "default" : "outline"}`}>
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h2 className="truncate font-bold">{booking.service.name}</h2>
          <div className="flex items-center justify-start gap-1">
            <Avatar className="h-5 w-5">
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="truncate text-sm">
              {booking.service.barbershop.name}
            </p>
          </div>
        </div>

        <div className="flex min-w-[100px] max-w-[100px] flex-col items-center justify-center border-l-2 border-solid text-center">
          <p className="text-sm capitalize">
            {format(date, "MMMM", { locale: ptBR })}
          </p>
          <h2 className="text-2xl font-semibold">
            {format(date, "dd", { locale: ptBR })}
          </h2>
          <p className="text-sm">{format(date, "HH ':' mm")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
