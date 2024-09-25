import RedditNavbar from "@/components/reddit-navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-white">
      <RedditNavbar />
      {children}
    </div>
  );
}
