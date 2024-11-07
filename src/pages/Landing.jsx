// Import the Button and Input components
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input"; // Adjusted to match default import
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function Landing() {
  return (
    <div className="w-full h-full bg-gray-900">
      <div className="max-w-[1200px] h-full m-auto flex flex-col items-center justify-center">
        <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
          The only URL Shortener <br /> you will ever need
        </h2>
        <form className="w-full flex flex-col sm:flex-row sm:h-14 md:w-2/4 items-center gap-4">
          <Input
            type="url"
            className="h-full flex-1 py-4 px-4flex-grow"
            placeholder="Enter URL here"
          />
          <Button className="mt-2 sm:mt-0" type="submit" variant="destructive">
            Shorten!
          </Button>
        </form>
        <img
          src="./banner1.jpg"
          alt="banner"
          className="w-full my-11 md:px-11"
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Landing;
