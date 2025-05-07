import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";

const Dashboard = () => {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const dataFromBE = await getAllProducts();

      if(dataFromBE.code = 200) {
        console.log(dataFromBE);
      }
    }

    fetchAPI();
  }, []);

  return (
    <>
      Dashboard page
    </>
  );
}

export default Dashboard;