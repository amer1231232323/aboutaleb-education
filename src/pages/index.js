import dynamic from 'next/dynamic';
import WhyStudy from "@/components/home/WhyStudy";
import OurServices from "@/components/home/OurServices";

const Hero = dynamic(() => import('@/components/home/Hero'), { ssr: false });
const FeaturedUniversities = dynamic(() => import('@/components/home/FeaturedUniversities'), { ssr: false });

export default function Home() {
  return (
    <>
      <Hero />
      <WhyStudy />
      <FeaturedUniversities />
      <OurServices />
    </>
  );
}
