import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";

function Landing() {
  return <div className="w-full h-full flex flex-col justify-center items-center">
    <div className="w-full max-width-[1200px] mx-auto flex flex-col justify-center items-center p-5">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl font-extrabold text-center">The only url shortner you'll ever need</h2>
      <form>
        <Input/>
        <Button>Shorten !</Button>
      </form>
      <img src="/banner1.jpg" className="w-full my-11 md:px-11" alt="shorten banner" />
    </div>
  </div>;
}

export default Landing;
