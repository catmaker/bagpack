import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "bagPack",
  description: "당신의 인생 여정을 기록하는 특별한 공간",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
