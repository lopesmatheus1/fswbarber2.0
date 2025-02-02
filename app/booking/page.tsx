import { LogInIcon } from "lucide-react";
import BookingCard from "../_components/booking-card";
import Header from "../_components/header";
import SignInDialogContent from "../_components/sign-in-dialog";

import {
  getBookings,
  getPastBookings,
} from "../_data-access/booking/get-bookings";
import { auth } from "../_lib/auth";
import { Button } from "../_components/ui/button";
import { Dialog, DialogTrigger } from "../_components/ui/dialog";

const Bookings = async () => {
  const session = await auth();
  const bookings = await getBookings();
  const pastBookings = await getPastBookings();
  return (
    <div>
      <Header />
      <h2 className="p-5 text-xl font-bold">Agendamentos</h2>
      {session ? (
        <div className="mb-5 px-4">
          <h2 className="mb-1 font-bold text-muted-foreground">Confirmados</h2>
          {bookings.length > 0 ? (
            <div className="mb-5 space-y-3">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <p className="mb-3 font-semibold">
              Você não tem reservas confirmadas
            </p>
          )}

          <h2 className="mb-1 font-bold text-muted-foreground">Finalizados</h2>
          {pastBookings.length > 0 ? (
            <div className="space-y-3">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <p>Você não tem reservas concluídas</p>
          )}
        </div>
      ) : (
        <div className="space-y-2 p-5">
          <h2 className="text-xl font-bold">
            Faça login para ver os seus agendamentos
          </h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <LogInIcon size={16} />
                Logar
              </Button>
            </DialogTrigger>
            <SignInDialogContent />
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Bookings;
