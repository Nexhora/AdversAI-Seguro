'use client';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react';

export default function Home() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const handleGenerate = () => {
    // Placeholder for AI generation logic
    console.log({
      productName,
      productDescription,
      targetAudience,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background font-sans p-4">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-primary font-serif">AdVerseAI</h1>
        <p className="text-lg text-muted-foreground mt-2">AI-Powered Advertising Campaigns</p>
      </header>

      <main className="w-full max-w-2xl">
        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-center">Create Your Ad Campaign</CardTitle>
            <CardDescription className="text-center">
              Describe your product and let our AI create the perfect ad for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="product-name" className="font-serif text-base">Product Name</Label>
                <Input 
                  id="product-name" 
                  placeholder="e.g., 'Artisan Coffee Beans'" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="font-sans"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description" className="font-serif text-base">Product Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="e.g., 'Sustainably sourced, single-origin beans from the highlands of Ethiopia...'"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="font-sans"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-audience" className="font-serif text-base">Target Audience</Label>
                <Input 
                  id="target-audience" 
                  placeholder="e.g., 'Young professionals, coffee connoisseurs'"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="font-sans"
                />
              </div>
              <Button onClick={handleGenerate} size="lg" className="w-full font-serif text-lg shadow-lg hover:shadow-xl transition-shadow">
                Generate Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
