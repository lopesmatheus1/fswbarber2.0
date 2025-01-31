"use client";
import { LogInIcon } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
  const handleLoginWithGithubClick = () => signIn("github");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 w-8">
          <LogInIcon size={18} />
        </Button>
      </DialogTrigger>
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
    </Dialog>
  );
};

export default SignInDialog;
