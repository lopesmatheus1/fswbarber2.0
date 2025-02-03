import { Card, CardContent } from "./ui/card";

const Footer = () => {
  return (
    <Card className="md:px-12 lg:px-24 xl:px-32">
      <CardContent className="flex items-center justify-between px-5 py-8">
        <p className="text-xs text-muted-foreground">
          © 2023 Copyright <span className="font-bold">FSW Barber</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default Footer;
