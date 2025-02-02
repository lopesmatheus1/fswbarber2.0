"use client";
import { format, isFuture } from "date-fns";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import BookingSummaryContent from "./booking-summary";
import CellphoneItem from "./cellphone-item";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import DeleteBookingContent from "./delete-booking-content";
import { useState } from "react";

interface BookingCardProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } };
  }>;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const date = new Date(booking.date);
  const isConfirmed = isFuture(date);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const isOnThePast = date < new Date();

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger className="w-full">
        <Card className="min-w-[85%]">
          <CardContent className="flex justify-between p-0">
            <div className="my-2 flex flex-col items-start space-y-1 pl-3">
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
      </SheetTrigger>
      <SheetContent className="flex w-[90%] flex-col justify-between p-5">
        <div>
          <SheetHeader className="border-b border-solid">
            <SheetTitle>Informações da reserva</SheetTitle>
          </SheetHeader>

          <div className="py-5">
            <div className="relative flex h-[180px] w-full items-end">
              <Image
                className="object-cover"
                src={"/map.png"}
                alt={"Mapa da localidade da barbearia"}
                fill
                quality={100}
              />
              <Card className="z-50 mx-4 mb-3 w-full">
                <CardContent className="flex items-center gap-2 px-5 py-3">
                  <Avatar>
                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h3 className="text-sm font-bold">
                      {booking.service.barbershop.name}
                    </h3>
                    <p className="text-sm">
                      {booking.service.barbershop.address}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            className="mb-2"
            variant={`${isConfirmed ? "default" : "outline"}`}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <Card className="mb-4">
            <BookingSummaryContent
              barbershopName={booking.service.barbershop.name}
              price={Number(booking.service.price)}
              selectedDay={booking.date}
              service={booking.service.name}
            />
          </Card>

          {booking.service.barbershop.phones.map((phone, i) => (
            <CellphoneItem phone={phone} key={`${phone}-${i}`} />
          ))}
        </div>
        <SheetFooter className="flex w-full flex-row gap-2">
          <SheetClose asChild>
            <Button className="w-full">Voltar</Button>
          </SheetClose>

          {isOnThePast ? (
            ""
          ) : (
            <Dialog>
              <DialogTrigger>
                <Button variant={"destructive"} className="w-full">
                  Cancelar reserva
                </Button>
              </DialogTrigger>
              <DeleteBookingContent
                closeSheet={setSheetIsOpen}
                id={booking.id}
              />
            </Dialog>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingCard;
