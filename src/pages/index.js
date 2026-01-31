import dynamic from 'next/dynamic';
import Head from 'next/head';
import WhyStudy from "@/components/home/WhyStudy";
import OurServices from "@/components/home/OurServices";

const Hero = dynamic(() => import('@/components/home/Hero'), { ssr: false });
const FeaturedUniversities = dynamic(() => import('@/components/home/FeaturedUniversities'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Abou Taleb - Study in Turkey</title>
        <meta name="description" content="Apply to top Turkish universities with Abou Taleb. We provide comprehensive support for international students." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <WhyStudy />
      <FeaturedUniversities />
      <OurServices />
    </>
  );
}
