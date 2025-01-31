import BarbershopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import SearchInput from "../_components/search";
import { searchBarbershop } from "../_data-access/barbershop/search-barbershop";
import { db } from "../_lib/prisma";

interface BarbershopsProps {
  searchParams: {
    title?: string;
    service?: string;
  };
}

const Barbershops = async ({ searchParams }: BarbershopsProps) => {
  const getBarbershop = await searchBarbershop({
    searchParams: {
      title: searchParams.title,
      service: searchParams.service,
    },
  });
  return (
    <div>
      <Header />
      <div className="p-5">
        <SearchInput />
      </div>

      <div className="px-5">
        <h2 className="text-muted-foreground">
          Resultado para &quot;{searchParams?.title}
          &quot;
        </h2>
      </div>
      <div className="my-5 grid grid-cols-2 gap-3 px-5">
        {getBarbershop.map((barbershop) => (
          <BarbershopItem
            key={barbershop.id}
            imageUrl={barbershop.imageUrl}
            name={barbershop.name}
            address={barbershop.address}
            id={barbershop.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Barbershops;
