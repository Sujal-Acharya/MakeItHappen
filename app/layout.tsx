import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/lib/hooks/useTheme";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "MakeItHappen - Goal Tracking & Productivity",
    description: "Track your goals, build habits, and achieve success with MakeItHappen",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <ThemeProvider>
                    <Providers>
                        {children}
                    </Providers>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
