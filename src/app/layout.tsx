import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata = {
  title: "Frontend Mentor | Kanban task management web app",
  content: "Kanban Task Management",
  property: "og:title",
  description: "Kanban Task Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  );
}
