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
        baseTheme: undefined,
        variables: {
          colorPrimary: '#171717',
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
          colorInputText: '#0a0a0a',
          colorText: '#0a0a0a',
          colorTextSecondary: '#737373',
          colorDanger: '#e40014',
          borderRadius: '0.375rem',
          fontFamily: 'var(--font-geist-sans)',
        },
        elements: {
          rootBox: 'w-full',
          card: 'bg-white shadow-2xl border-0',
          headerTitle: 'text-zinc-900 text-2xl font-bold',
          headerSubtitle: 'text-zinc-600 text-sm',
          socialButtonsBlockButton: 'bg-white border-2 border-zinc-300 text-zinc-900 hover:bg-zinc-50',
          formFieldLabel: 'text-zinc-900 font-medium text-sm mb-1',
          formFieldInput: 'bg-white border-2 border-zinc-300 text-zinc-900 rounded-md px-3 py-2 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/20',
          formButtonPrimary: 'bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-md px-4 py-2.5',
          footerActionLink: 'text-zinc-900 hover:text-zinc-700 font-medium',
          identityPreviewText: 'text-zinc-900',
          formFieldInputShowPasswordButton: 'text-zinc-600 hover:text-zinc-900',
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


