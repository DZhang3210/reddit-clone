import RedditNavbar from "@/components/reddit-navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <RedditNavbar />
      {children}
    </div>
  );
}
