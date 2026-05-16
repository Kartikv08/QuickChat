import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { SocketProvider } from "./context/SocketContext";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Just a click away to send a message",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <SocketProvider>{children}</SocketProvider>
        </AppProvider>
      </body>
    </html>
  );
}
