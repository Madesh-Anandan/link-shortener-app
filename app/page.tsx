import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, BarChart3, Shield, Zap, MousePointerClick, Share2 } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Link2,
      title: "Instant Short Links",
      description: "Create short, memorable links in seconds. Perfect for sharing on social media, emails, or anywhere else."
    },
    {
      icon: BarChart3,
      title: "Analytics & Tracking",
      description: "Track clicks, monitor performance, and gain insights into how your links are being used."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with encrypted data storage. Your links are safe and always available."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Blazing fast redirects with global CDN. Your users get instant access with minimal latency."
    },
    {
      icon: MousePointerClick,
      title: "Custom Aliases",
      description: "Create branded, memorable short links with custom aliases that match your brand."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your links anywhere - social media, emails, QR codes, or embed them in your content."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/5 px-4 py-2 dark:bg-zinc-50/10">
            <Zap className="h-4 w-4 text-zinc-900 dark:text-zinc-50" />
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Fast, Simple, Powerful
            </span>
          </div>
          
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-6xl lg:text-7xl">
            Shorten Links.<br />
            Track Performance.<br />
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
              Grow Your Reach.
            </span>
          </h1>
          
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 md:text-xl">
            Create short, memorable links in seconds. Track clicks, manage your links, 
            and share them anywhere. The modern link management platform for professionals.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
            <SignInButton>
              <Button size="lg" className="text-base border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700">
                Get Started Free
              </Button>
            </SignInButton>
            <Button size="lg" variant="ghost" className="text-base border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Detailed Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Powerful features to help you create, manage, and track your links effectively
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-50">
                    <Icon className="h-6 w-6 text-zinc-50 dark:text-zinc-900" />
                  </div>
                  <CardTitle className="text-zinc-900 dark:text-zinc-50">{feature.title}</CardTitle>
                  <CardDescription className="text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto border-t border-zinc-800 px-4 py-8">
        <div className="text-center text-sm text-zinc-400">
          <p>© 2026 Link Shortener. Built with Next.js and Clerk.</p>
        </div>
      </footer>
    </div>
  );
}


