import type { Metadata } from "next";
import "@/styles/first-version.css";
import { CollectionWine } from "@/components/first-version/collectionWine";
import { Footer } from "@/components/first-version/footer";
import { Header } from "@/components/first-version/header";
import { History } from "@/components/first-version/history";
import { InfaOStatus } from "@/components/first-version/infaOStatus";
import { StoreFront } from "@/components/first-version/storeFront";
import { Terruar } from "@/components/first-version/terruar";

export const metadata: Metadata = {
  title: "Первая версия",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default function FirstVersionPage() {
  return (
    <>
      <Header />
      <main>
        <CollectionWine />
        <InfaOStatus />
        <Terruar />
        <StoreFront />
        <History />
      </main>
      <Footer />
    </>
  );
}