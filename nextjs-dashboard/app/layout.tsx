import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body> {children}
        <footer>
          Hecho con ❤️ por Vicu
          </footer>
      </body>
    </html>
  );
}
