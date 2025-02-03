import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import SidebarSheet from "./sidebar-sheet-content";
import { auth } from "../_lib/auth";
import SignInDialogContent from "./sign-in-dialog";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = async () => {
  const session = await auth();
  return (
    <Card className="md:px-12 lg:px-24 xl:px-32">
      <CardContent className="flex items-center justify-between px-5 py-8">
        <Link href={"/"}>
          <Image
            src={"/Logo.png"}
            height={18}
            width={120}
            alt={"Imagem da logo da FSW barber"}
          />
        </Link>

        <div className="flex items-center justify-center gap-3 max-lg:hidden">
          {!session?.user ? (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-8 w-full">
                    Fazer login
                    <LogInIcon size={18} />
                  </Button>
                </DialogTrigger>
                <SignInDialogContent />
              </Dialog>
            </>
          ) : (
            <div className="flex items-center justify-center gap-6">
              <div>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant={"ghost"}
                >
                  <Link href={"/booking"}>
                    <Image
                      src={"/calendar.svg"}
                      height={16}
                      width={16}
                      alt={"Agendamentos"}
                    />
                    <p>Agendamentos</p>
                  </Link>
                </Button>
              </div>

              <Avatar className="rounded-full bg-primary p-0.5">
                <AvatarImage
                  className="rounded-full"
                  src={session.user.image ?? ""}
                />
                <AvatarFallback>
                  {session.user.name?.split("")[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-base font-bold">{session?.user?.name}</h2>
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <SidebarSheet />
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
