
import React from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  text: string;
  as?: 'p' | 'h1' | 'h2' | 'h3';
  textAlign?: 'left' | 'center' | 'right';
  bgColor?: string;
  textColor?: string;
}

export const Text = ({ text, as = 'p', textAlign = 'left', bgColor = 'bg-transparent', textColor = 'text-foreground' }: TextProps) => {
  const Tag = as;
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[textAlign];

  const sizeClass = {
    h1: 'text-4xl md:text-5xl font-bold font-headline',
    h2: 'text-3xl md:text-4xl font-bold font-headline',
    h3: 'text-2xl md:text-3xl font-bold font-headline',
    p: 'text-base md:text-lg'
  }[as];

  return (
    <section className={cn('py-12 px-4', bgColor, textColor)}>
      <div className="max-w-4xl mx-auto">
        <Tag className={cn(alignClass, sizeClass)}>
            {text}
        </Tag>
      </div>
    </section>
  );
};
