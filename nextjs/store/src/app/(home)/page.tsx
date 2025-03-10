import { MainProducts } from "app/components/home/MainProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '🧡 Future World',
  description:'Welcome to the future world, an eccomerce site that sells the future',
  keywords: ["eccomerce","future","world"],
}

export default function Home() {
  return (
    <main>
      <MainProducts/>
    </main>
  );
}
