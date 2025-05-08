import variables from "../../config/variables";

import { Link, useParams } from "react-router-dom";
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


const ProductEdit = () => {
  const { id } = useParams(); // params.id
  const navigate = useNavigate();
  
  // --- Tinymce
  const editorRef = useRef(null);
  // --- End tinymce

  const [categoryTree, setCategoryTree] = useState([]);
  const [productDetail, setProductDetail] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  // --- FilePond
  const [files, setFiles] = useState([]);
  const [defaultImageUrls, setDefaultImageUrls] = useState([]);
  // --- End FilePond

  
  // ----- Get Categories Tree ----- //
  const fetchCategoryTree = async () => {
    const dataFromBE = await getCategoriesTree();

    if(dataFromBE.code === 200) {
      setCategoryTree(dataFromBE.data);
    }
  };

  useEffect(() => {
    fetchCategoryTree();
  }, []);
  // ----- End get Categories Tree ----- //


  // ----- Fetch product detail ----- //
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:8080/admin333/products/${id}`, {
        credentials: "include"
      });
      const data = await response.json();

      if(data.code === 200) 
      {
        setProductDetail(data.data);

        setDefaultImageUrls(data.data.images);

        if(data.data.images) {
          setFiles(
            data.data.images.map((url) => {
              return {
                source: url,
                options: {
                  type: 'remote', // use the image URL directly, without expecting a Blob or File object
                },
              };
            })
          );
        }

        setSelectedCategory(data.data.categoryIds?.[0] || ""); 
      }
    };
    
    fetchProduct();
  }, [id]);
  // ----- End fetch product detail ----- //


  // ----- Handle submit form ----- //
  const handleSubmit = async (event, currFiles) => {
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


    // Process FilePond files
    const currentFiles = currFiles;
    const currentFileNames = currentFiles
      .filter(f => f.file) // only real files
      .map(f => f.file.name);

    // console.log(name);
    // console.log(parent);
    // console.log(position);
    // console.log(currentFiles);

    let shouldUpload = false;

    // Check count mismatch
    if (currentFileNames.length !== defaultImageUrls.length) {
      shouldUpload = true;
    } 
    else {
      // Check for any file not matching existing URLs
      for (let name of currentFileNames) {
        const matched = defaultImageUrls.some(url => url.includes(name));
        if (!matched) {
          shouldUpload = true;
          break;
        }
      }
    }

    // Append new files only if needed
    if (shouldUpload) {
      currentFiles.forEach(fileItem => {
        console.log("Chay vao day 1: ")
        formData.append("images", fileItem.file);
      });
    } 
    else {
      // No change, preserve old image URLs
      defaultImageUrls.forEach(url => {
        console.log("Chay vao day 2:")
        formData.append("existingImageUrls", url);
      });
    }

    Swal.fire({
      title: "Save changes?",
      text: "This will update the product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Save changes!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Updating product...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await fetch(`http://localhost:8080/admin333/products/${id}`, {
          method: "PATCH",
          body: formData,
          credentials: "include"
        });

        const dataFromBE = await response.json();

        if (dataFromBE.code === 200) {
          await Swal.fire({
            title: "Updated successfully!",
            text: "Product has been updated.",
            icon: "success"
          });
          navigate(`/${variables.pathAdmin}/products`);
        }
      }
    });
  };
  // ----- End handle submit form ----- //

  // ----- JustValidate ----- //
  const validatorRef = useRef(null);

  useEffect(() => {
    if (validatorRef.current) {
      validatorRef.current.destroy();
    }
  
    const validation = new JustValidate("#product-edit-form");
    validatorRef.current = validation;

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
      .addField('#stock', [
        {
          rule: 'number',
          errorMessage: 'Stock must be a number!'
        },
        {
          rule: 'minNumber',
          value: 0,
          errorMessage: 'Stock cannot be negative!'
        }
      ])
      .onSuccess((event) => {
        event.preventDefault();
        handleSubmit(event, files);
      })

      return () => {
        if (validatorRef.current) {
          validatorRef.current.destroy();
        }
      };
  }, [files]); // important
  // ----- End JustValidate ----- //

  return (
    <>
      <h1 className="box-title">Edit Product</h1>

      {productDetail && (
        <div className="section-crud">
          <form 
            id="product-edit-form" 
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
                defaultValue={productDetail.name}
              />
            </div>

            {categoryTree && (
              <div className="inner-group">
                <label htmlFor="parent" className="inner-label">Category</label>
                <select 
                  id="parent" 
                  name="parent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
                defaultValue={productDetail.position}
              />
            </div>

            <div className="inner-group">
              <label htmlFor="price" className="inner-label">Price</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                defaultValue={productDetail.price}
              />
            </div>

            <div className="inner-group">
              <label htmlFor="stock" className="inner-label">Stock</label>
              <input 
                type="number" 
                id="stock" 
                name="stock" 
                defaultValue={productDetail.stock}
              />
            </div>

            <div className="inner-group inner-two-columns">
              <label className="inner-label">Images</label>
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
                defaultChecked={productDetail.isFeatured}
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
                initialValue={productDetail.description}
                init={{
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
                }}
              />
            </div>

            <div className="inner-button inner-two-columns">
              <button type="submit">Save Changes</button>
            </div>
          </form>

          <div className="inner-back">
            <Link to={`/${variables.pathAdmin}/products`}>
              Back to List Products
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductEdit;