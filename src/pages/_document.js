import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const lang = localStorage.getItem('i18nextLng') || 'ar';
              document.documentElement.dir = (lang === 'ar' || lang === 'fa') ? 'rtl' : 'ltr';
              document.documentElement.lang = lang;
            `,
          }}
        />
      </body>
    </Html>
  );
}