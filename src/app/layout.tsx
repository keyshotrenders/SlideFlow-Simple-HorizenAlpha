export const metadata = {
  title: "SlideFlow Simple",
  description: "Simple Photo Slideshow Maker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        {children}
      </body>
    </html>
  );
}
