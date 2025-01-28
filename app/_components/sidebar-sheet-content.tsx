import { LogOutIcon } from "lucide-react";
import { quickSearchOption } from "../_constants/search";
import { Button } from "./ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";

const SidebarSheetContent = () => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex">
          <h2>Menu</h2>
        </SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-start gap-3 border-b py-6">
        <div className="rounded-full bg-primary p-0.5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </div>

        <div>
          <p className="font-bold">Matheus Lopes</p>
          <p className="text-xs">matheuslopes@gmail.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b py-6">
        <Button className="w-full justify-start" variant={"default"}>
          <Image src={"/home.svg"} height={16} width={16} alt={"ínicio"} />
          <p>Ínicio</p>
        </Button>

        <Button className="w-full justify-start" variant={"ghost"}>
          <Image
            src={"/calendar.svg"}
            height={16}
            width={16}
            alt={"Agendamentos"}
          />
          <p>Agendamentos</p>
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-2 border-b py-6">
        {quickSearchOption.map((option) => (
          <Button
            variant={"ghost"}
            className="justify-start"
            key={option.title}
          >
            <Image
              src={option.imageUrl}
              height={16}
              width={16}
              alt={option.title}
            />
            <p>{option.title}</p>
          </Button>
        ))}
      </div>

      <Button className="w-full justify-start" variant={"ghost"}>
        <LogOutIcon size={16} />
        <p>Sair</p>
      </Button>
    </SheetContent>
  );
};

export default SidebarSheetContent;
