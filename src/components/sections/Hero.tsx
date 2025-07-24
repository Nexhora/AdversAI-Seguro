
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  textColor?: string;
}

export const Hero = ({ title, subtitle, buttonText, bgColor = 'bg-gray-100', textAlign = 'left', textColor = 'text-gray-900' }: HeroProps) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[textAlign];

  return (
    <section className={cn('py-20 px-4', bgColor, textColor)}>
      <div className={cn("max-w-4xl mx-auto flex flex-col", alignClass)}>
        <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">{title}</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">{subtitle}</p>
        <Button className="mt-8 w-fit bg-primary-foreground text-primary hover:bg-primary-foreground/90">
          {buttonText}
        </Button>
      </div>
    </section>
  );
};
