"use client";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/currency";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { useMemo, useState } from "react";
import { Calendar } from "@/app/_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { format, set } from "date-fns";
import { createBooking } from "@/app/_data-actions/booking/create-booking";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface ServiceCardProps {
  imageUrl: string;
  service: string;
  text: string;
  price: number;
  barbershopName: string;
  serviceId: string;
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

const ServiceCard = ({
  barbershopName,
  imageUrl,
  price,
  service,
  text,
  serviceId,
}: ServiceCardProps) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return;
      const hour = Number(selectedTime.split(":")[0]);
      const minute = Number(selectedTime.split(":")[1]);
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      });
      await createBooking({
        serviceId: serviceId,
        userId: data?.user?.id as any,
        date: newDate,
      });
      toast.success("Reserva criada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar reserva!");
    }
  };
  return (
    <Card>
      <CardContent className="flex gap-2 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            className="rounded-lg object-cover"
            src={imageUrl}
            fill
            alt="Imagem do serviço prestado"
            quality={100}
          />
        </div>

        <div className="flex flex-col justify-between">
          <h2 className="text-sm font-bold">{service}</h2>
          <p className="text-sm text-muted-foreground">{text}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-primary">
              {formatCurrency(price)}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"secondary"} size={"sm"}>
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Fazer reserva</SheetTitle>
                </SheetHeader>

                <div className="mt-5 border-y border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    fromDate={new Date()}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                {selectedDay ? (
                  <div className="flex w-full flex-row gap-3 overflow-x-auto border-b border-solid py-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  ""
                )}

                {selectedDay && selectedTime && (
                  <Card className="my-5">
                    <CardContent className="p-0">
                      <CardHeader className="px-5 py-2">
                        <div className="flex w-full items-center justify-between font-bold">
                          <h2>{service}</h2>
                          <p className="text-sm">{formatCurrency(price)}</p>
                        </div>
                      </CardHeader>

                      <div className="mb-2 flex items-center justify-between px-5">
                        <p className="text-sm text-muted-foreground">Data</p>
                        <p className="text-end">
                          {format(selectedDay, "d 'De' MMMM", { locale: ptBR })}
                        </p>
                      </div>

                      <div className="mb-2 flex items-center justify-between px-5">
                        <p className="text-sm text-muted-foreground">Data</p>
                        <p>{selectedTime}</p>
                      </div>

                      <div className="mb-2 flex items-center justify-between px-5">
                        <p className="text-sm text-muted-foreground">
                          Barbearia
                        </p>
                        <p className="text-end">{barbershopName}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedDay && selectedTime && (
                  <SheetFooter>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
