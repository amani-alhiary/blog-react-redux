import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import { useState } from "react";
import Pagination from "./Pagination";
import AddBlog from "./AddBlog";
import Page404 from "./Page404";

const ProductPage = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get("http://localhost/ApiRedux/blogs.php")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Products :", products);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(4);

  // Get current blogs
  const indexOfLastBlogs = currentPage * blogsPerPage;
  const indexOfFirstBlogs = indexOfLastBlogs - blogsPerPage;
  const currentBlogs = products.slice(indexOfFirstBlogs, indexOfLastBlogs);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // Searche
  const [inputText, setInputText] = useState("");
  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
<>
{sessionStorage.getItem("username")!== null?



    <div>
      <br />
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            {sessionStorage.getItem("role") == "admin" ? (
              <AddBlog />
            ) : (
              <div>
                <br />
                <br />
                <br />
              </div>
            )}
          </div>
          <div className="col d-flex justify-content-end align-items-center m-0">
            <div class="input-group rounded" style={{ width: "250px" }}>
              <input
                type="search"
                class="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={inputHandler}
                label="Search"
              />
            </div>
          </div>{" "}
        </div>
      </div>

   <div className="row m-5 d-flex justify-content-center align-items-center">
        <ProductComponent
          currentBlogs={currentBlogs}
          all={products}
          search={inputText}
        />
</div>

      <div
        className="d-flex justify-content-center align-items-center mt-3"
        style={{ height: "20px" }}
      >
        {inputText == "" ? (
          <Pagination
            blogsPerPage={blogsPerPage}
            totalBlogs={products.length}
            paginate={paginate}
          />
        ) : null}
      </div>
    </div>:

    <Page404/>}






</>

  );
};

export default ProductPage;
