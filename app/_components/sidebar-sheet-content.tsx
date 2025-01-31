"use client";
import { LogOutIcon, MenuIcon } from "lucide-react";
import { quickSearchOption } from "../_constants/search";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import SignInDialog from "./sign-in-dialog";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const SidebarSheet = () => {
  const { data } = useSession();
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-start gap-3 border-b py-6">
          {!data?.user ? (
            <div className="flex w-full items-center justify-between">
              <p>Olá, faça seu login! </p>
              <SignInDialog />
            </div>
          ) : (
            <>
              <div className="rounded-full bg-primary p-0.5">
                <Avatar>
                  <AvatarImage src={data?.user?.image ?? ""} />
                </Avatar>
              </div>
              <div>
                <p className="font-bold">{data?.user?.name}</p>
                <p className="text-xs">{data?.user?.email}</p>
              </div>
            </>
          )}
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
              onClick={() => {
                setSheetIsOpen(false);
              }}
              variant={"ghost"}
              className="justify-start"
              key={option.title}
              asChild
            >
              <Link href={`/barbershop?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  height={16}
                  width={16}
                  alt={option.title}
                />
                <p>{option.title}</p>
              </Link>
            </Button>
          ))}
        </div>

        {data?.user ? (
          <Button
            onClick={() => signOut()}
            className="w-full justify-start"
            variant={"ghost"}
          >
            <LogOutIcon size={16} />
            <p>Sair</p>
          </Button>
        ) : (
          ""
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
