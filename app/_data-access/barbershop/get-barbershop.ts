import "server-only";
import { db } from "@/app/_lib/prisma";

export const getBarberShops = async () => {
  return await db.barbershop.findMany({});
};

export const getPopularBarberShops = async () => {
  return await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
};
