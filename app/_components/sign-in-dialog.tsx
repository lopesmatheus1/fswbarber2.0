"use client";

import {  FaGoogle } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignInDialogContent = () => {
  return (
    <DialogContent className="w-[90%] rounded">
      <DialogHeader>
        <DialogTitle>Faça Login na plataforma</DialogTitle>
      </DialogHeader>

      <DialogDescription className="text-center">
        Entre usando o Google
      </DialogDescription>

      <Button onClick={() => signIn("google")}>
        <FaGoogle size={16} />
        Continuar com Google
      </Button>
    </DialogContent>
  );
};

export default SignInDialogContent;
