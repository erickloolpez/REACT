import { Footer } from "app/components/shared/Footer";
import { Header } from "app/components/shared/Header";
import { Pacifico } from 'next/font/google'
import localFont from "next/font/local";
import "app/sass/globals.sass"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body className={pacifico.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
