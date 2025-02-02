"use client";
import { Dispatch, SetStateAction } from "react";
import { deleteBooking } from "../_data-actions/booking/delete-booking";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";

const DeleteBookingContent = ({
  id,
  closeSheet,
}: {
  id: string;
  closeSheet: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleDeleteClick = async () => {
    try {
      await deleteBooking({ bookingId: id });
      toast.success("reserva cancelada com sucesso!");
      closeSheet(false);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao cancelar reserva tente novamente");
    }
  };
  return (
    <DialogContent className="w-[90%]">
      <DialogHeader>
        <DialogTitle>Cancelar Reserva</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja cancelar esse agendamento?
        </DialogDescription>
      </DialogHeader>

      <div className="flex w-full items-center justify-center gap-2">
        <DialogClose>
          <Button>Voltar</Button>
        </DialogClose>

        <DialogClose onClick={handleDeleteClick}>
          <Button variant={"destructive"}>Cancelar</Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default DeleteBookingContent;
