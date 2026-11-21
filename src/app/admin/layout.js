export const metadata = {
  title: "Admin Portal | GHRITKALASH",
  description: "Internal Order Management and Dispatch Portal",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f4ec] text-[#2c221a] antialiased">
      {children}
    </div>
  );
}
