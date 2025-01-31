import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import SidebarSheet from "./sidebar-sheet-content";

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

        <SidebarSheet />
      </CardContent>
    </Card>
  );
};

export default Header;
