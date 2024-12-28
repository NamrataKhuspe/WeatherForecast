import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// app/layout.tsx
import { ReactNode } from "react";
import { UserProvider } from "../app/context/UserContext"; // Adjust the import path based on your actual file structure


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
}); 

export const metadata = {
  title: 'Weather Forecast',
  description: 'Get the latest weather updates.',
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap your component tree with the UserProvider */}
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
