import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const isAuthenticated = useSelector((state) => state.authenReducer);

  return (
    <>
      {isAuthenticated ? <Outlet /> : <Navigate to="/admin333/account/login" />}
    </>
  );
}

export default PrivateRoutes;