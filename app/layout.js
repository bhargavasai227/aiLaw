import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Talk with Ai",
  description: "Generate responces from gemini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={inter.className}>
      <Nav/>
      {children}
      </body>
    </html>
  );
}
