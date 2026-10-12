import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";

import { MediaProtection } from "@/components/ui/MediaProtection";
import { siteDescription, siteTitle, siteUrl } from "@/lib/siteConfig";

import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "онлайн-запись",
    "CRM для салона",
    "расписание мастеров",
    "запись клиентов",
    "управление студией",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Linta",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Linta — управление записями, командой и выручкой студии",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="bg-background font-sans text-ink antialiased">
        <MediaProtection />
        {children}
        <Toaster
          position="top-right"
          closeButton
          gap={10}
          toastOptions={{
            duration: 3500,
            closeButtonAriaLabel: "Закрыть уведомление",
            classNames: {
              toast: "!rounded-xl !border !bg-surface !text-ink !shadow-md",
              title: "!font-bold !text-ink",
              description: "!text-ink/70",
              success: "!border-accent/30 !bg-accent/[0.06] [&_[data-icon]]:!text-accent",
              error:
                "!border-status-cancelled/30 !bg-status-cancelled/[0.06] [&_[data-icon]]:!text-status-cancelled",
              info: "!border-status-paid/30 !bg-status-paid/[0.06] [&_[data-icon]]:!text-status-paid",
              closeButton: "!border-ink/10 !bg-surface !text-ink",
            },
          }}
        />
      </body>
    </html>
  );
}
