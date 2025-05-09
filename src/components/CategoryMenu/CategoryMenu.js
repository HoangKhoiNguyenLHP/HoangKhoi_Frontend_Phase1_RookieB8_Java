import { Link } from "react-router-dom";

const CategoryMenu = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <>
      {categories.map((category) => (
        <li key={category.id} className="relative group">
          <Link to={`/categories/${category.slug}`}>{category.name}</Link>

          {category.children && category.children.length > 0 && (
            <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-md rounded mt-0 ml-2 z-10">
              <CategoryMenu categories={category.children} />
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default CategoryMenu;