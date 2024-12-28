// app/layout.tsx or pages/_app.tsx
import { UserProvider } from "../context/UserContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
