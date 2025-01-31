"use client";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";

const formSchema = z.object({
  search: z
    .string()
    .min(1, {
      message: "Digite algo para buscar",
    })
    .max(50, { message: "Digite no máximo 50 caracteres" }),
});

const SearchInput = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    return router.push(`/barbershop?title=${data.search}`);
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full gap-2"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Buscar Barbearias" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-10 w-10">
            <Search size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchInput;
