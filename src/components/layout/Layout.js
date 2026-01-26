import dynamic from 'next/dynamic';
import Footer from "./Footer";
import WhatsAppButton from "../ui/WhatsAppButton";
import ImageSlider from "../ui/ImageSlider";

const Header = dynamic(() => import('./Header'), { ssr: false });

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <ImageSlider />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
