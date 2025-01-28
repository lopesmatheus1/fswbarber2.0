import "server-only";
import { db } from "@/app/_lib/prisma";

export const getBarberShops = async () => {
  return await db.barbershop.findMany({});
};

export const getUniqueBarberShop = async (id: string) => {
  return await db.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  });
};

export const getPopularBarberShops = async () => {
  return await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
};
