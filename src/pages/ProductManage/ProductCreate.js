import variables from "../../config/variables";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { displayOptionsTree } from "../../helpers/categoryHierarchy.helper";
import { getCategoriesTree } from "../../services/categoryService";

// --- Tinymce
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
// --- End tinymce

// --- SweetAlert
import Swal from "sweetalert2";
// --- End SweetAlert

// --- JustValidate
import JustValidate from "just-validate";
// --- End JustValidate

// --- FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);
// --- End FilePond

const ProductCreate = () => {
  // --- Tinymce
  const editorRef = useRef(null);
  // -- End tinymce

  const navigate = useNavigate();
  const [categoryTree, setCategoryTree] = useState([]);

  const [files, setFiles] = useState([]); // filePond


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


  // ----- Handle submit form ----- //
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const name = event.target.name.value;
    const parent = event.target.parent.value;
    const position = event.target.position.value;
    const price = event.target.price.value;
    const stock = event.target.stock.value;
    const isFeatured = event.target.isFeatured.checked;
  
    let description = "";
    if (editorRef.current) {
      description = editorRef.current.getContent();
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("categoryIds", parent);
    formData.append("position", position);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("isFeatured", isFeatured);
    formData.append("description", description);
  
    files.forEach(fileItem => {
      formData.append("images", fileItem.file);
    });
  

    Swal.fire({
      title: "Keep creating?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Create new product!",
      cancelButtonText: "Discard"
    }).then(async (result) => {
      if (result.isConfirmed) {
        // --- Show loading spinner alert while waiting
        Swal.fire({
          title: "Creating product...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        // --- End show loading spinner alert while waiting
  

        // const dataFromBE = await createProduct(formData);
        const response = await fetch(`http://localhost:8080/admin333/products`, {
          method: "POST",
          body: formData,
          credentials: "include"
        });

        const dataFromBE = await response.json();
  
        if(dataFromBE.code == 201) {
          await Swal.fire({
            title: "Create successfully!",
            text: "Your product has been saved.",
            icon: "success",
          });
  
          navigate(`/${variables.pathAdmin}/products`);
        }
      }
    });
  }
  // ----- End handle submit form ----- //

  // ----- JustValidate ----- //
  useEffect(() => {
    const validation = new JustValidate("#product-create-form");

    validation
      .addField('#name', [
        {
          rule: 'required',
          errorMessage: 'Please enter product name!'
        }
      ])
      .addField('#price', [
        {
          rule: 'minNumber',
          value: 0,
          errorMessage: 'Price cannot be negative!'
        }
      ])
      .onSuccess(async (event) => {
        await handleSubmit(event);
      })
  }, []);
  // ----- End JustValidate ----- //

  return (
    <>
      <h1 className="box-title">Create Product</h1>

      <div className="section-crud">
        <form 
          id="product-create-form" 
          encType="multipart/form-data"
          // onSubmit={handleSubmit}
        >
          <div className="inner-group">
            <label htmlFor="name" className="inner-label">
              Product Name <span className="field-required">*</span>
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
            />
          </div>

          {categoryTree && (
            <div className="inner-group">
              <label htmlFor="parent" className="inner-label">Category</label>
              <select 
                id="parent" 
                name="parent" 
              >
                <option value="">-- Select Category --</option>
                {displayOptionsTree(categoryTree)}
              </select>
            </div>
          )}

          <div className="inner-group">
            <label htmlFor="position" className="inner-label">Position</label>
            <input 
              type="number" 
              id="position" 
              name="position" 
            />
          </div>

          <div className="inner-group">
            <label htmlFor="price" className="inner-label">Price</label>
            <input 
              type="number" 
              id="price" 
              name="price" 
            />
          </div>

          <div className="inner-group">
            <label htmlFor="stock" className="inner-label">Stock</label>
            <input 
              type="number" 
              id="stock" 
              name="stock" 
            />
          </div>

          <div className="inner-group inner-two-columns">
            <label htmlFor="images" className="inner-label">Images</label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={10}
              acceptedFileTypes={['image/*']}
              name="images"
              labelIdle='Drag & drop or <span class="filepond--label-action">Choose image</span>'
            />
          </div>

          <div className="inner-two-columns">
            <label htmlFor="isFeatured" className="inner-label">Featured?</label>
            <input
              type="checkbox"
              className="form-check-input"
              id="isFeatured"
              name="isFeatured"
              defaultChecked={false}
            />
          </div>

          <div className="inner-group inner-two-columns">
            <label htmlFor="description" className="inner-label">
              Description
            </label>
            <Editor
              id="description"
              name="description"
              apiKey={process.env.REACT_APP_MCE_API_KEY}
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
          <Link to={`/${variables.pathAdmin}/products`}>
            Back to List Products
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProductCreate;