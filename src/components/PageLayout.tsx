import type { PropsWithChildren } from "react";
import Header from "./Header";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-20">{props.children}</main>
    </>
  );
};
