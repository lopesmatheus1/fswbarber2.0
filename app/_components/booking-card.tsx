import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

const BookingCard = () => {
  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        <div className="my-2 space-y-1 pl-3">
          <Badge>Confirmado</Badge>
          <h2 className="text-lg font-bold">Corte de cabelo</h2>
          <div className="flex items-center justify-start gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <p>Nome da barbearia</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5 text-center">
          <p className="text-sm">Fevereiro</p>
          <h2 className="text-2xl font-semibold">06</h2>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
