import dynamic from 'next/dynamic';
import Footer from "./Footer";
import WhatsAppButton from "../ui/WhatsAppButton";

const Header = dynamic(() => import('./Header'), { ssr: false });

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
