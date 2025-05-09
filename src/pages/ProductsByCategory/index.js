import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem";

const ProductsByCategory = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`http://localhost:8080/api/client/categories/${slug}`);
      const data = await res.json();
      if (data.code === 200) {
        setProducts(data.data.products);
      }
    };

    fetchProducts();
  }, [slug]);

  // console.log(products);

  return (
    <>
      {products && (
        <div className="tour-domestic">
          <div className="container">
            <h2 className="text-xl font-bold my-4">Result</h2>
            <div className="inner-wrap">
              {products.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsByCategory;