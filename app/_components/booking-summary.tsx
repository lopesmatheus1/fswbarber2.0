import { formatCurrency } from "@/app/_helpers/currency";
import { ptBR } from "date-fns/locale";
import { CardHeader } from "./ui/card";
import { format } from "date-fns";

interface BookingSummaryProps {
  service: string;
  price: number;
  selectedDay: Date;
  barbershopName: string;
}

const BookingSummaryContent = ({
  service,
  barbershopName,
  price,
  selectedDay,
}: BookingSummaryProps) => {
  return (
    <>
      <CardHeader className="px-5 py-2">
        <div className="flex w-full items-center justify-between font-bold">
          <h2 className="text-sm font-bold">{service}</h2>
          <p className="text-sm">{formatCurrency(price)}</p>
        </div>
      </CardHeader>
      <div className="mb-2 flex items-center justify-between px-5 text-sm">
        <p className="text-muted-foreground">Data</p>
        <p className="text-end">
          {format(selectedDay, "d 'De' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="mb-2 flex items-center justify-between px-5 text-sm">
        <p className="text-muted-foreground">Horário</p>
        <p>{format(selectedDay, "HH ':' mm")}</p>
      </div>
      <div className="mb-2 flex items-center justify-between px-5 text-sm">
        <p className="text-muted-foreground">Barbearia</p>
        <p className="text-end">{barbershopName}</p>
      </div>
    </>
  );
};

export default BookingSummaryContent;
