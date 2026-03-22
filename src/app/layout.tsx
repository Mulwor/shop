import "./styles/normalize.css"
import "./styles/base.css";
import Header from "../components/layout/Header/Header";

export default function RootLayout({ children } : Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
