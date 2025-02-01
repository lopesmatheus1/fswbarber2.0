import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import "server-only";

export const getBookings = async () => {
  const sessions = await auth();
  if (!sessions?.user) return [];

  return db.booking.findMany({
    where: {
      userId: sessions.user.id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
};

export const getPastBookings = async () => {
  const sessions = await auth();
  if (!sessions?.user) return [];

  return db.booking.findMany({
    where: {
      userId: sessions.user.id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
};
