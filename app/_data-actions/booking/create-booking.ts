"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateBookingParams {
  serviceId: string;
  date: Date;
}
export const createBooking = async (params: CreateBookingParams) => {
  const session = await auth();
  if (!session?.user) throw new Error("Usuário não autenticado");
  await db.booking.create({
    data: { ...params, userId: (session.user as any).id },
  });

  revalidatePath("/", "layout");
};
