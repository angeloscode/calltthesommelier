import "@/styles/home.css";
import { CollectionWine } from "@/components/home/collectionWine";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { History } from "@/components/home/history";
import { InfaOStatus } from "@/components/home/infaOStatus";
import { StoreFront } from "@/components/home/storeFront";
import { StructuredData } from "@/components/home/structuredData";
import { Terruar } from "@/components/home/terruar";
import { VineyardGallery } from "@/components/home/vineyardGallery";
import { getCatalog } from "@/lib/catalog";

// Витрина читает вина из БД; после правок в админке страница перегенерируется через revalidatePath.
export const revalidate = 300;

export default async function HomePage() {
  const wines = await getCatalog();

  return (
    <div id="top" className="lp-page">
      <StructuredData wines={wines} />
      <Header />
      <main>
        <CollectionWine />
        <InfaOStatus />
        <VineyardGallery />
        <Terruar />
        <StoreFront wines={wines} />
        <History />
      </main>
      <Footer />
    </div>
  );
}
