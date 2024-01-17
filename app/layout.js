"use client"; // This is a client component 👈🏽

import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";

import "./globals.css";
import "@/styles/styles.scss";
const inter = Inter({ subsets: ["latin"] });
import { Provider } from "react-redux";
import store from "../redux/store";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}> {children}</Provider>
      </body>
    </html>
  );
}
