import "./globals.css";
import { Nanum_Myeongjo } from "next/font/google";
import Header from "../components/header/Header";
import Footer from "@/components/footer/Footer";
import Head from "next/head";

const inter = Nanum_Myeongjo({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
});

export const metadata = {
  metadataBase: new URL("https://pandora-web-phi.vercel.app/"),
  title: {
    default: "La Caja de Pandora",
    template: `%s | La Caja de Pandora`,
  },
  verification: {
    google: "google-site-verification=878787878",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/logo_pandora.png"
        />
      </Head>
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
