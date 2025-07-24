
import React from "react";
import { cn } from "@/lib/utils";
import * as Icons from 'lucide-react';

interface FeatureItem {
  icon: keyof typeof Icons;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  bgColor?: string;
  textColor?: string;
}

const IconComponent = ({ name }: { name: keyof typeof Icons }) => {
    const LucideIcon = Icons[name] as React.ComponentType<any>;
    // A sensible fallback icon
    if (!LucideIcon) {
        return <Icons.ShieldCheck className="h-8 w-8 mb-4 text-primary" />;
    }
    return <LucideIcon className="h-8 w-8 mb-4 text-primary" />;
};


export const Features = ({ title, subtitle, features = [], bgColor = 'bg-background', textColor = 'text-foreground' }: FeaturesProps) => {

  return (
    <section className={cn('py-20 px-4', bgColor, textColor)}>
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{title}</h2>
            {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-lg shadow-sm border">
              <div className="flex justify-center">
                 <IconComponent name={feature.icon} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
