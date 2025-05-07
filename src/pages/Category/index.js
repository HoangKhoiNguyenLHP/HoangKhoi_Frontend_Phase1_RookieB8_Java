import variables from "../../config/variables";

// --- Library to format date
import moment from "moment";
// --- End library to format date

import { FaMagnifyingGlass, FaPlus, FaRegPenToSquare, FaRegTrashCan, FaTrashCan } from "react-icons/fa6";

import { data, Link, Outlet } from "react-router-dom";

import "./Category.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";

const Category = () => {
  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const dataFromBE = await getAllCategories();

      if(dataFromBE.code = 200) {
        setListCategories(dataFromBE.data.data.reverse());
      }
    }

    fetchAPI();
  }, []);

  console.log(listCategories);

  return (
    <>
      <h1 className="box-title">Categories management</h1>

      {/* section-action-tools */}
      <div className="section-action-tools">
        <div className="inner-wrap">
          <div className="box-search">
            <div className="inner-search">
              <FaMagnifyingGlass />
              <input
                type="text"
                placeholder="Tìm kiếm"
                // value={searchKeyword}
                // onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>

          <div className="inner-button-create">
            <Link to={`/${variables.pathAdmin}/categories/create`}>
              <FaPlus /> Create new
            </Link>
          </div>

          <div className="inner-button-trash">
            <Link to={`/${variables.pathAdmin}/categories/trash`}>
              <FaTrashCan /> Recycle bin
            </Link>
          </div>
        </div>
      </div>
      {/* End section-action-tools */}

      {/* section-table-categories-page */}
      <div className="section-table-categories-page">
        <div className="table-two">
          <table>
            <thead>
              <tr>
                <th className="inner-center">
                  <input type="checkbox" className="inner-check" name="check-all" />
                </th>
                <th>Category name</th>
                <th className="inner-center">Position</th>
                <th>Created on</th>
                <th>Last updated on</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listCategories.map((item) => (
                <tr key={item.id}>
                  <td className="inner-center">
                    <input type="checkbox" className="inner-check" data-id={item.id} />
                  </td>
                  <td>{item.name}</td>
                  <td className="inner-center">{item.position}</td>
                  <td>
                    {/* <div>Le Van A</div> */}
                    <div className="inner-time">
                      {moment(item.createdOn).format("HH:mm:ss - DD/MM/YYYY")}
                    </div>
                  </td>
                  <td>
                    {/* <div>Le Van A</div> */}
                    <div className="inner-time">
                      {moment(item.updatedOn).format("HH:mm:ss - DD/MM/YYYY")}
                    </div>
                  </td>
                  <td>
                    <div className="inner-buttons">
                      <Link
                        to={`/${variables.pathAdmin}/categories/edit/${item.id}`}
                        className="inner-edit"
                      >
                        <FaRegPenToSquare />
                      </Link>

                      <button
                        className="inner-delete"
                        data-api={`/${variables.pathAdmin}/categories/delete/${item.id}`}
                      >
                        <FaRegTrashCan />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* End section-table-categories-page */}
    </>
  );
}

export default Category;