import { db } from "@/app/_lib/prisma";
import "server-only";

interface SearchBarbershop {
  searchParams: {
    title?: string;
    service?: string;
  };
}

export const searchBarbershop = async ({ searchParams }: SearchBarbershop) => {
  return await db.barbershop.findMany({
    where: {
      OR: [
        searchParams.title
          ? {
              name: {
                contains: searchParams.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });
};
