import variables from "../../config/variables";

// --- Library to format date
import moment from "moment";
// --- End library to format date

import { FaMagnifyingGlass, FaPlus, FaRegPenToSquare, FaRegTrashCan, FaTrashCan } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import "./Category.css";
import { useEffect, useState } from "react";
import { deleteCategorySoft, getAllCategories } from "../../services/categoryService";

const Category = () => {
  const [listCategories, setListCategories] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const keywordFromURL = params.get("keyword") || "";

  // ----- Get list categories ----- //
  // separate this block of code
  // used for: reload page
  const fetchAPI = async () => {
    const dataFromBE = await getAllCategories(keywordFromURL);
    if(dataFromBE.code = 200) {
      setListCategories(dataFromBE.data.data); // do not sort here, sort in BE
    }
  }
  
  useEffect(() => {
    fetchAPI();
  }, [keywordFromURL]); // fetch whenever keyword changes
  // ----- End get list categories ----- //


  // ----- Search ----- //
  const handleSearch = (event) => {
    if (event.code === "Enter") {
      const value = event.target.value.trim();
      const newParams = new URLSearchParams(location.search);
  
      if (value) {
        newParams.set("keyword", value);
      } 
      else {
        newParams.delete("keyword");
      }
  
      navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
      // navigation updates URL and triggers component re-render due to changed keyword
    }
  };
  // ----- End search ----- //


  // ----- Soft delete ----- //
  const handleSoftDelete = async (itemId) => {
    const dataFromBE = await deleteCategorySoft(itemId);
    
    if(dataFromBE.code == 200) {
      fetchAPI(); // refresh updated data ("reload" page)
    }
  }
  // ----- End soft delete ----- //


  // console.log(listCategories);

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
                onKeyUp={handleSearch}
                defaultValue={keywordFromURL}
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
                        to={`/${variables.pathAdmin}/categories/${item.id}/edit`}
                        className="inner-edit"
                      >
                        <FaRegPenToSquare />
                      </Link>

                      <button
                        className="inner-delete"
                        onClick={() => handleSoftDelete(`${item.id}`)}
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