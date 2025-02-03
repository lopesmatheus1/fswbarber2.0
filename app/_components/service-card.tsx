"use client";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
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
import { isPast, isToday, set } from "date-fns";
import { useSession } from "next-auth/react";
import { Booking } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { getBookingsTime } from "@/app/_data-actions/booking/get-bookings";
import { createBooking } from "@/app/_data-actions/booking/create-booking";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { LogInIcon } from "lucide-react";
import SignInDialogContent from "@/app/_components/sign-in-dialog";
import BookingSummaryContent from "./booking-summary";

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

interface GetTimeListProps {
  bookings: Booking[];
  selectedDay: Date;
}

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
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  // FETCH DOS AGENDAMENTOS
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  useEffect(() => {
    if (!selectedDay) return;
    const fetch = async () => {
      const bookings = await getBookingsTime({
        date: selectedDay,
        serviceId,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectedDay, serviceId]);

  {
    /*FUNÇAO QUE PEGA AS LISTA DE HORÁRIOS DISPONIVEL*/
  }
  const GetTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
    return TIME_LIST.filter((TIME) => {
      const minute = Number(TIME.split(":")[1]);
      const hour = Number(TIME.split(":")[0]);
      const timeIsOnThePast = isPast(
        set(new Date(), { hours: hour, minutes: minute }),
      );

      if (timeIsOnThePast && isToday(selectedDay)) return false;

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

  {
    /*FUNÇÃO PARA RETORNAR O DIA SELECECIONADO, COM HORA E MINUTO*/
  }
  const newDay = useMemo(() => {
    if (!selectedTime || !selectedDay) return;
    const hour = Number(selectedTime.split(":")[0]);
    const minute = Number(selectedTime.split(":")[1]);
    return set(selectedDay, {
      minutes: minute,
      hours: hour,
    });
  }, [selectedDay, selectedTime]);

  {
    /*RESETA OS STATES QUANDO O USUÁRIO FECHA O SHEET*/
  }
  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
    setSheetIsOpen(false);
  };

  {
    /*SERVER ACTION PARA CRIAR UM AGENDAMENTO NO BANCO*/
  }
  const handleCreateBooking = async () => {
    try {
      setDisableButton(true);
      if (!newDay) return;
      await createBooking({
        serviceId: serviceId,
        date: newDay,
      });
      handleBookingSheetOpenChange();
      toast.success("Reserva criada com sucesso!");
      setDisableButton(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar reserva!");
    }
  };

  const timeList = useMemo(() => {
    if (!selectedDay) return [];
    return GetTimeList({
      bookings: dayBookings,
      selectedDay,
    });
  }, [dayBookings, selectedDay]);

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
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
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
                        ))
                      ) : (
                        <p className="text-xs font-semibold">
                          Não há horários disponíveis para este dia
                        </p>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  {selectedDay && selectedTime && (
                    <Card className="my-5">
                      <BookingSummaryContent
                        barbershopName={barbershopName}
                        service={service}
                        price={price}
                        selectedDay={selectedDay}
                      />
                    </Card>
                  )}

                  {selectedDay && selectedTime && (
                    <SheetFooter>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={
                          !selectedDay || !selectedTime || disableButton
                        }
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="h-8 w-8">
                          <LogInIcon size={18} />
                        </Button>
                      </DialogTrigger>
                      <SignInDialogContent />
                    </Dialog>
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
