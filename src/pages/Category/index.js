import variables from "../../config/variables";

import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

import { Link } from "react-router-dom";

import "./Category.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";

const Category = () => {
  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const dataFromBE = await getAllCategories();

      if(dataFromBE.code = 200) {
        console.log(dataFromBE);
      }
    }

    fetchAPI();
  }, []);

  return (
    <>
      <div className="section-table-categories-page">
        <div className="table-two">
          <table>
            <thead>
              <tr>
                <th className="inner-center">
                  <input type="checkbox" className="inner-check" name="check-all" />
                </th>
                <th>Tên danh mục</th>
                <th className="inner-center">Vị trí</th>
                <th className="inner-center">Trạng thái</th>
                <th>Tạo bởi</th>
                <th>Cập nhật bởi</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="inner-center">
                  <input type="checkbox" className="inner-check" data-id={""} />
                </td>
                <td>Category 1</td>
                <td className="inner-center">1</td>
                <td className="inner-center">
                  <div className="badge badge-accept">Hoạt động</div>
                </td>
                <td>
                  <div>Le Van A</div>
                  <div className="inner-time">20/05/2025</div>
                </td>
                <td>
                  <div>Le Van A</div>
                  <div className="inner-time">20/05/2025</div>
                </td>
                <td>
                  <div className="inner-buttons">
                      <Link
                        to={`/${variables.pathAdmin}/categories/edit/id`}
                        className="inner-edit"
                      >
                        <FaRegPenToSquare />
                      </Link>

                      <button
                        className="inner-delete"
                        data-api={`/${variables.pathAdmin}/categories/delete/id`}
                      >
                        <FaRegTrashCan />
                      </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Category;