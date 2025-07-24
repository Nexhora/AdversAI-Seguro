
import React from "react";
import { Button as UIButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  text: string;
  textAlign?: 'left' | 'center' | 'right';
  bgColor?: string;
}

export const Button = ({ text, variant, size, textAlign = 'center', bgColor = 'bg-transparent' }: ButtonProps) => {
  const alignClass = {
    left: 'text-left justify-start',
    center: 'text-center justify-center',
    right: 'text-right justify-end',
  }[textAlign];

  return (
    <section className={cn('py-8 px-4', bgColor)}>
        <div className={cn("max-w-4xl mx-auto flex", alignClass)}>
            <UIButton variant={variant} size={size}>
                {text}
            </UIButton>
        </div>
    </section>
  );
};
