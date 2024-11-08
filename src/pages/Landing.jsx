// Import the Button and Input components
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Adjusted to match default import
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from "react-router-dom";

function Landing() {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    event.preventDefault();
    if(longUrl){
      navigate(`/auth?createNew=${longUrl}`)
    }
  }
  return (
    <div className="w-full h-full bg-gray-900">
      <div className="max-w-[1200px] h-full m-auto flex flex-col items-center justify-center">
        <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
          The only URL Shortener <br /> you will ever need
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row sm:h-14 md:w-2/4 items-center gap-4">
          <Input
            type="url"
            value={longUrl}
            className="h-full flex-1 py-4 px-4flex-grow"
            placeholder="Enter URL here"
            onChange= {(e)=>setLongUrl(e.target.value)}
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
        <Accordion type="multiple" collapsible className="w-full md:px-11">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the trimmer url shortner works ?
            </AccordionTrigger>
            <AccordionContent>
              When you entera long URL, our system generates a shorter version of the URL. This shortened URL is then used to redirect the user to the original long URL.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does the trimmer url shortner works ?
            </AccordionTrigger>
            <AccordionContent>
              When you entera long URL, our system generates a shorter version of the URL. This shortened URL is then used to redirect the user to the original long URL.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How does the trimmer url shortner works ?
            </AccordionTrigger>
            <AccordionContent>
              When you entera long URL, our system generates a shorter version of the URL. This shortened URL is then used to redirect the user to the original long URL.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Landing;
