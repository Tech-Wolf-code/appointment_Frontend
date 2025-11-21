import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/redux/Providers";

export const metadata = {
  title: "Laptop Repair Service",
  description: "Laptop repair booking system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <Providers>

          {/* NAVBAR */}
          <header className="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur">
            <Navbar />
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1 flex justify-center pt-16"> 
            {/* 👆 Adds space below navbar so content never overlaps */}
            <div className="w-full ">
              {children}
            </div>
          </main>

        </Providers>
      </body>
    </html>
  );
}
