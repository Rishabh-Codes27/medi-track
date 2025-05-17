import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="h-screen 2xl:container 2xl:mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Tracking Your Medication Intake,</h1>
        <h1 className="text-5xl bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent font-bold pb-2">
          Now Made Easy!
        </h1>
      </div>

      <div>
        <a href="/medi-track" className=""><Button variant='default'>Try it Out! <ArrowUpRight /></Button></a>
      </div>
    </div>
  );
};

export default Hero;
