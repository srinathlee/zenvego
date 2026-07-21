import type { Metadata } from "next";
import { Baloo_2, Poppins } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "zenvego — Plant-Based Breakfast Subscription · Gachibowli, Hyderabad",
  description:
    "zenvego delivers fresh plant-based breakfast bowls every morning in Gachibowli, Hyderabad. Stay Zen · Eat +ve · Go Far. Nourish your body, calm your mind.",
  keywords: [
    "plant based breakfast",
    "breakfast subscription",
    "fruit bowls Hyderabad",
    "Gachibowli",
    "healthy breakfast delivery",
    "zenvego",
  ],
  openGraph: {
    title: "zenvego — Plant-Based Breakfast Subscription",
    description:
      "Fresh plant-based breakfast delivered every morning in Gachibowli, Hyderabad. Stay Zen · Eat +ve · Go Far.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
