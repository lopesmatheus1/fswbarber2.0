import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

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

        <Button variant={"ghost"} size={"icon"}>
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
