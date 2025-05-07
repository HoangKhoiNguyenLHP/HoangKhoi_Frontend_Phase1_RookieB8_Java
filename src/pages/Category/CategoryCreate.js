import variables from "../../config/variables";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// --- Tinymce
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
// --- End tinymce

// --- SweetAlert
import Swal from "sweetalert2";
// --- End SweetAlert

import JustValidate from "just-validate";

import { createCategory, getCategoriesTree } from "../../services/categoryService";

const CategoryCreate = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [categoryTree, setCategoryTree] = useState([]);

  // -- Loading spinner
  // const [loading, setLoading] = useState(false);
  // -- End loading spinner


  // ----- Get Categories Tree ----- //
  useEffect(() => {
    const fetchAPI = async () => {
      const dataFromBE = await getCategoriesTree();

      if(dataFromBE.code == 200) {
        setCategoryTree(dataFromBE.data);
      }
    }

    fetchAPI();
  }, []);
  // ----- End get Categories Tree ----- //


  // ----- Display Categories Tree ----- //
  const displayOptionsTree = (listCategories, level = 0, parent = "") => {
    return listCategories.map(item => (
      <React.Fragment key={item.id}>
        <option 
          value={item.id}
          defaultChecked={parent == item.id ? true : false}
        >
          {`${"--".repeat(level)} ${item.name}`}
        </option>
  
        {item.children && item.children.length > 0 &&
          displayOptionsTree(item.children, level + 1, parent)
        }
      </React.Fragment>
    ));
  }
  // ----- End display Categories Tree ----- //


  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const parent = event.target.parent.value;
    const position = event.target.position.value;

    let description = "";
    if(editorRef.current) {
      description = editorRef.current.getContent();
    }

    // console.log(name);
    // console.log(parent);
    // console.log(position);
    // console.log(description);


    const dataSubmit = {
      name: name,
      parent: parent,
      position: position,
      description: description
    };

    // -- Loading spinner
    // setLoading(true);
    // -- End loading spinner

    Swal.fire({
      title: "Keep creating?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Create new category!",
      cancelButtonText: "Discard"
    }).then( async (result) => {
        if(result.isConfirmed) {
          const dataFromBE = await createCategory(dataSubmit);

          if(dataFromBE.code == 201) {
            await Swal.fire({
              title: "Create successfully!",
              text: "Your file has been saved.",
              icon: "success",
            })

            // this code only navigates
            // this code does not help to reload page or else
            // navigate(`/${variables.pathAdmin}/dashboard`);
            navigate(`/${variables.pathAdmin}/categories`);
          }
        }
      });

    // --- Old manual spinner code
    // const dataFromBE = await createCategory(dataSubmit);

    // if(dataFromBE.code == 201) {
    //   // console.log(dataFromBE);
            
    //   // --- Test spinner
    //   // setTimeout(() => {
    //   //   // this code only navigates
    //   //   // this code does not help to reload page or else
    //   //   // navigate(`/${variables.pathAdmin}/dashboard`);
    //   //   navigate(`/${variables.pathAdmin}/categories`);
    //   // }, 2000);
    //   // --- End test spinner

    //   // this code only navigates
    //   // this code does not help to reload page or else
    //   // navigate(`/${variables.pathAdmin}/dashboard`);
    //   navigate(`/${variables.pathAdmin}/categories`);
    // }
    // --- End old manual spinner code
  }

  // ----- JustValidate ----- //
  useEffect(() => {
    const validation = new JustValidate("#category-create-form");

    validation
      .addField('#name', [
        {
          rule: 'required',
          errorMessage: 'Please enter category name!'
        }
      ])
      .onSuccess(async (event) => {
        await handleSubmit(event);
      })
  }, []);
  // ----- End JustValidate ----- //

  // console.log(categoryTree);

  return (
    <>
      {/* Loading spinner */}
      {/* {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader-overlay"></div>
        </div>
      )} */}
      {/* End loading spinner */}

      <h1 className="box-title">Create Category</h1>

      <div className="section-crud">
        <form 
          id="category-create-form" 
          encType="multipart/form-data"
          // onSubmit={handleSubmit}
        >
          <div className="inner-group">
            <label htmlFor="name" className="inner-label">
              Category Name <span className="field-required">*</span>
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
            />
          </div>

          <div className="inner-group">
            <label htmlFor="parent" className="inner-label">Parent Category</label>
            <select 
              id="parent" 
              name="parent" 
            >
              <option value="">-- Select Category --</option>
              {displayOptionsTree(categoryTree)}
            </select>
          </div>

          <div className="inner-group">
            <label htmlFor="position" className="inner-label">Position</label>
            <input 
              type="number" 
              id="position" 
              name="position" 
            />
          </div>

          <div className="inner-group inner-two-columns">
            <label htmlFor="description" className="inner-label">
              Description
            </label>
            <Editor
              id="description"
              name="description"
              apiKey="ypmwfvoj1sujo1vx0j6cdkhlcv3htnptdyt11boq7zqhoe9d"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                selector: '#description',
                height: 300,
                branding: false,
                plugins: [
                  'charmap', 'codesample', 'emoticons', 'help',
                  'image', 'link', 'lists', 'advlist', 'media',
                  'preview', 'searchreplace', 'table', 'wordcount',
                ],
                toolbar:
                  'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                  'outdent indent | charmap | codesample | emoticons | image | link | ' +
                  'numlist bullist | media | preview | searchreplace | help',
                
                // images_upload_url: '/admin/upload/image', // Backend API
                // automatic_uploads: true,
                // file_picker_types: 'image',
                // image_caption: true,
              }}
            />
          </div>

          <div className="inner-button inner-two-columns">
            <button type="submit">Create</button>
          </div>
        </form>

        <div className="inner-back">
          <Link to={`/${variables.pathAdmin}/categories`}>
            Back to List Categories
          </Link>
        </div>
      </div>
    </>
  );
}

export default CategoryCreate;