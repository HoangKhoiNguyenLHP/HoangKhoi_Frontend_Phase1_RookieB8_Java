import { useRoutes } from "react-router-dom";
import { routes } from "../../routes";

const AllRoutes = () => {
  const elements = useRoutes(routes); // <Routes>, <Route>
  console.log(elements)

  return (
    <>
      {elements} 
    </>
  );
}

export default AllRoutes;