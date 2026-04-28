import type { ReactNode } from "react";
import PublicNav from "@/components/public-nav";
import Footer from "@/components/footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
