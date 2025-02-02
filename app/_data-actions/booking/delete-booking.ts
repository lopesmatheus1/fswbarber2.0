"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteBookingProps {
  bookingId: string;
}

export const deleteBooking = async ({ bookingId }: DeleteBookingProps) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });
  revalidatePath("/", "layout");
};
