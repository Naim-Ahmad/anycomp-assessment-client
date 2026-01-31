import { Red_Hat_Display } from "next/font/google";
import localFont from "next/font/local";

export const proximaNova = localFont({
  src: [
    {
      path: "../public/fonts/proxima-nova/Proxima-Nova-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/proxima-nova/proxima-nova-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/proxima-nova/Proxima-Nova-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/proxima-nova/Proxima-Nova-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-proxima",
});

export const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-redhat",
});
