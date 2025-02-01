"use client";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/currency";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { format, set } from "date-fns";
import { useSession } from "next-auth/react";
import SignInDialog from "@/app/_components/sign-in-dialog";
import { Booking } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { getBookings } from "@/app/_data-actions/booking/get-bookings";
import { createBooking } from "@/app/_data-actions/booking/create-booking";
import { toast } from "sonner";

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
  //atualizar a lista de horarios
  //não permetir que usários que não estejam logados façam reservas

  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  //FETCH DOS AGENDAMENTOS
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  useEffect(() => {
    if (!selectedDay) return;
    const fetch = async () => {
      const bookings = await getBookings({
        date: selectedDay,
        serviceId,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectedDay, serviceId]);

  const GetTimeList = (bookings: Booking[]) => {
    return TIME_LIST.filter((TIME) => {
      const minute = Number(TIME.split(":")[1]);
      const hour = Number(TIME.split(":")[0]);
      const hasBookingOnCurrentTime = bookings.some(
        (booking) =>
          booking.date.getHours() === hour &&
          booking.date.getMinutes() === minute,
      );

      if (hasBookingOnCurrentTime) {
        return false;
      }
      return true;
    });
  };

  const newDay = useMemo(() => {
    if (!selectedTime || !selectedDay) return;
    const hour = Number(selectedTime.split(":")[0]);
    const minute = Number(selectedTime.split(":")[1]);
    return set(selectedDay, {
      minutes: minute,
      hours: hour,
    });
  }, [selectedDay, selectedTime]);

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
    setSheetIsOpen(false);
  };

  const handleCreateBooking = async () => {
    try {
      if (!newDay) return;
      await createBooking({
        serviceId: serviceId,
        userId: data?.user?.id as any,
        date: newDay,
      });
      handleBookingSheetOpenChange();
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

            <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
              <SheetTrigger asChild>
                <Button
                  onClick={handleBookingSheetOpenChange}
                  variant={"secondary"}
                  size={"sm"}
                >
                  Reservar
                </Button>
              </SheetTrigger>
              {data?.user ? (
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="mt-5 border-y border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={setSelectedDay}
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
                      {GetTimeList(dayBookings).map((time) => (
                        <Button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
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
                            {format(selectedDay, "d 'De' MMMM", {
                              locale: ptBR,
                            })}
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
              ) : (
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="text-left">
                      Para continuar com a reserva, faça login
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex w-full items-center justify-between py-5">
                    <p>Entrar </p>
                    <SignInDialog />
                  </div>
                </SheetContent>
              )}
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
