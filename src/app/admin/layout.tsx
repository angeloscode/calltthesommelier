import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: { default: "Админка", template: "%s — Админка" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-screen bg-muted/40 font-sans text-foreground">
      {children}
      <Toaster richColors position="top-right" />
    </div>
  );
}
