import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ flex: 1, minHeight: "60vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
