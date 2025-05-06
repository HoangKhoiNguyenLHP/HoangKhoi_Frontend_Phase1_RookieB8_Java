import { Outlet } from "react-router-dom";

const LayoutAccount = () => {
  return (
    <>
      <div 
        className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat py-[50px]"
        style={{ backgroundImage: "url('/bg-account.svg')" }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default LayoutAccount;