import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <main className="main">        
        <Outlet />
      </main>
    </>
  );
}

export default Main;