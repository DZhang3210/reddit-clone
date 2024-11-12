import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full md:w-[calc(100vw-14rem)] xl:w-[calc(100vw-16rem)] h-[calc(100vh-80px)] overflow-y-auto ">
          {children}
        </div>
      </div>
    </div>
  );
}
