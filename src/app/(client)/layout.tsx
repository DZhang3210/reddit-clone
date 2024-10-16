import RedditNavbar from "@/components/reddit-navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-white">
      <RedditNavbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full md:w-[calc(100vw-12rem)] xl:w-[calc(100vw-12rem)] h-[calc(100vh-120px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
