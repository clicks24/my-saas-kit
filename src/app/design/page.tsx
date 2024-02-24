import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "@/components/ui/bar-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation, NavigationLink } from "@/components/ui/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Heading } from "@/components/ui/typography";
import { randomInt } from "crypto";

function generatePastDaysList(
  numDays: number
): { date: number; value: number }[] {
  const now = new Date().getTime();
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const pastDaysList = [];

  for (let i = 1; i <= numDays; i++) {
    const pastDate = new Date(now - i * dayInMilliseconds);
    const formattedObject = {
      date: pastDate.getTime(),
      value: i * 2 + randomInt(600),
    };
    pastDaysList.push(formattedObject);
  }

  return pastDaysList;
}

export default async function Page() {
  const data = generatePastDaysList(14).reverse();

  return (
    <main>
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col gap-4 pb-8">
          <Heading>The design system</Heading>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-surface" />
            <div className="w-8 h-8 bg-border" />
            <div className="w-8 h-8 bg-container" />
            <div className="w-8 h-8 bg-muted" />
            <div className="w-8 h-8 bg-disabled" />
            <div className="w-8 h-8 bg-primary" />
            <div className="w-8 h-8 bg-focus" />
            <div className="w-8 h-8 bg-critical" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <Button>Button</Button>
                <Button variant="outline">Button</Button>
                <Button variant="cta">Button</Button>
                <Button variant="destructive">Button</Button>
                <Button variant="ghost">Button</Button>
              </div>
              <div className="flex flex-col gap-4">
                <Button size={"sm"}>Button</Button>
                <Button size={"default"} variant="outline">
                  Button
                </Button>
                <Button size={"lg"} variant="cta">
                  Button
                </Button>
                <Button size={"icon"} variant="destructive">
                  X
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Input placeholder="Input box" />
              <Input variant="lg" placeholder="Input box" />
              <Input variant="xl" placeholder="Input box" />
              <Textarea placeholder="Textarea" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Accordion type="multiple">
                <AccordionItem value="list-1">
                  <AccordionTrigger>Item 1</AccordionTrigger>
                  <AccordionContent>Content</AccordionContent>
                </AccordionItem>
                <AccordionItem value="list-2">
                  <AccordionTrigger>Item 2</AccordionTrigger>
                  <AccordionContent>Content</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-2">
              <Alert>
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>Description</AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>Description</AlertDescription>
              </Alert>
              <Alert variant={"destructive"}>
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>Description</AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Badge variant={"default"}>Badge</Badge>
                <Badge variant={"destructive"}>Badge</Badge>
                <Badge variant={"outline"}>Badge</Badge>
                <Badge variant={"rainbow"}>Badge</Badge>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Label</Label>
                <Dialog>
                  <DialogTrigger>
                    <Button>Dialog (click me)</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Title</DialogTitle>
                    </DialogHeader>
                    <p className="px-4 pb-4">Content</p>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Switch />

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="w-[200px]">
                    <SelectItem value="item">Select me 1</SelectItem>
                    <SelectItem value="item-1">Select me 2</SelectItem>
                    <SelectItem value="item-2">Select me 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Navigation orientation="horizontal">
                  <NavigationLink
                    orientation="horizontal"
                    name="Item"
                    href="/design"
                  />
                  <NavigationLink
                    orientation="horizontal"
                    name="Item"
                    href="#"
                  />
                </Navigation>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
              </CardHeader>
              <CardContent>Card content!</CardContent>
            </Card>
            <BarChart
              data={data}
              tooltip="This is fake data for display purposes only."
              name="Chart!"
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
