// app/layout.js
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import ScrollToHash from '@/components/ScrollToHash';
import i18n from "@/i18n/i18n";

export const metadata = {
  title: 'Portfolio Emil',
  description: 'Portfolio Emil Duchemin',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <i18n>
          <Navbar />
          <ScrollToHash />
          {children}
        </i18n>
      </body>
    </html>
  );
}

