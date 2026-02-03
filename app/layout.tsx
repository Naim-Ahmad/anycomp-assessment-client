import Providers from "@/store/Providers";
import { proximaNova, redHatDisplay } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "AnyComp Assessment",
  description: "Assessment project for AnyComp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${proximaNova.variable} ${redHatDisplay.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
