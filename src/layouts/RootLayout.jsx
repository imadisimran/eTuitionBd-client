import React from "react";
import Container from "./Container";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <Container>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </Container>
  );
};

export default RootLayout;
