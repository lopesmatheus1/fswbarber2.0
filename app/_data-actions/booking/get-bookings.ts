"use server";

import { db } from "@/app/_lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

interface getBookingsTimeProps {
  date: Date;
  serviceId: string;
}

export const getBookingsTime = ({ date }: getBookingsTimeProps) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
};
