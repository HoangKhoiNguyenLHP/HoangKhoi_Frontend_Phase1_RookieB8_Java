import { Outlet } from "react-router-dom";

import "./LayoutAccount.css";

const LayoutAccount = () => {
  return (
    <>
      <div className="page-account">
        <Outlet />
      </div>
    </>
  );
}

export default LayoutAccount;