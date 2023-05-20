import "~/styles/globals.css";
import "@smastrom/react-rating/style.css";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Skill Search</title>
        <meta
          name="description"
          content="Discover the world’s potential... in people "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
