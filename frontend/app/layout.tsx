import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import { DomainProvider } from "./providers/domain-provider";

export const metadata: Metadata = {
  title: "SkillVal",
  description: "Digitale EVC-trajecten met AI-assist voor autotechniek en jeugdzorg.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className="theme-skillval min-h-screen antialiased">
        <ThemeProvider>
          <DomainProvider>
            <div className="global-backdrop">
              <main className="global-content">{children}</main>
              <footer className="global-footer">SkillVal · Bouw aan je erkenning</footer>
            </div>
          </DomainProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
