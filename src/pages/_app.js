import "@/styles/globals.css";
import "@/lib/i18n";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  if (isAdminPage) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
