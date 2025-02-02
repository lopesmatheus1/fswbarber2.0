"use client";

import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";
import { Smartphone } from "lucide-react";

interface CallphoneItemProps {
  phone: string;
}

const CellphoneItem = ({ phone }: CallphoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast("Telefone copiado com sucesso!");
  };
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center justify-center">
        <Smartphone />
        <p>{phone}</p>
      </div>

      <Button onClick={() => handleCopyPhoneClick(phone)} variant={"secondary"}>
        Copiar
      </Button>
    </div>
  );
};

export default CellphoneItem;
