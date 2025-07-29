import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background font-sans p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-primary font-serif">
            AdVerseAI
          </h1>
          <p className="mt-4 text-2xl text-muted-foreground">
            AI-Powered Advertising Campaigns
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Your Next Ad Campaign</CardTitle>
            <CardDescription>
              Describe your product and let our AI generate the perfect ad copy and visuals for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="e.g., 'Artisanal Coffee Beans'" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Input id="target-audience" placeholder="e.g., 'Urban professionals aged 25-40'" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Product Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product's key features and benefits..."
                  className="min-h-[120px]"
                />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Generate Campaign
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}