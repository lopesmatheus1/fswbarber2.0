import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarSheetContent from "./sidebar-sheet-content";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-5 py-8">
        <Link href={"/"}>
          <Image
            src={"/Logo.png"}
            height={18}
            width={120}
            alt={"Imagem da logo da FSW barber"}
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheetContent />
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
