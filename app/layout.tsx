import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener",
  description: "Shorten and manage your links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#171717',
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
          colorInputText: '#0a0a0a',
        },
        elements: {
          formFieldInput: 'border-2 border-gray-300 focus:border-primary',
          card: 'shadow-2xl',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              `,
            }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Force hide Clerk elements */
              .cl-badge { display: none !important; }
              .cl-internal-badge { display: none !important; }
              .cl-profileSection__emailAddresses button[type="button"] { display: none !important; }
              .cl-profileSection__activeDevices { display: none !important; }
            `
          }} />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <Link href="/" className="text-xl font-semibold hover:opacity-80">
                Link Shortener
              </Link>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <SignedOut>
                  <SignInButton>
                    <Button className="border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button variant="ghost" className="border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Button asChild>
                    <Link href="/dashboard">
                      Dashboard
                    </Link>
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}


