import { Card, CardContent } from "./ui/card";

const Footer = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-5 py-8">
        <p className="text-xs text-muted-foreground">
          © 2023 Copyright <span className="font-bold">FSW Barber</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default Footer;
