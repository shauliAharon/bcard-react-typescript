import React, { useState } from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import LandingPage from "./LandingPage";

type LayoutProp = {
  children: JSX.Element[] | JSX.Element;
};

const Layout: React.FC<LayoutProp> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <>  
{
  isLoading ?
    <LandingPage onClick={() => setIsLoading(false)} /> :
    <>
    <Header />
      <Main>{children}
      </Main>
      <Footer />
</>
}
    </>
  );
};

export default Layout;
