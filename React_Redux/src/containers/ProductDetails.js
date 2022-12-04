import React, { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";
import Page404 from "./Page404";
const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { id, title, img, content } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`http://localhost/ApiRedux/blogs.php/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);


  const [formErrors, setFormErrors] = useState({});
  const [inputs, setInputs] = useState([]);

  
 
  const handleChange = (e) => {
   
     setInputs({ ...inputs, [e.target.name]: e.target.value ,id:id});
      setFormErrors(validate(inputs));
  }
  const handleSubmit = (event) => {
      event.preventDefault();
      if (Object.values(formErrors).length === 0) {
      axios.put(`http://localhost/ApiRedux/blogs.php/${id}`, inputs)
      window.location.reload(false);
    
    }else {
      const elem = document.getElementById("errorMassage");
      elem.innerHTML = "Invalied Data";
  }
      
     
    }


    



  



    const validate = (values) => {
      const errors = {};
      const regex =/^[a-zA-Z ]+$/g;

      if (!values.title) {
          errors.title = "Title is required";
      } else if (!regex.test(values.title)) {
          errors.title = "Only letters are allowed in the title";
      }


      if (!values.img) {
        errors.img = "Image is required";
    } 
      


      if (!values.content) {
          errors.content = "Content is required";
      } 
      return errors;
  };



























  return (

<>
    {sessionStorage.getItem("username")!== null?



    <div className="ui grid container mt-5">
      {product.length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="contener">
       
           <form  onSubmit={handleSubmit}>
          <div className="ui two column stackable center aligned grid">
            <br/>
          <h1 style={{color:"red"}} id='errorMassage'></h1>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={img} />
              </div>
             
              <div className="column rp">
                <h4 style={{marginTop:"12px"}}>Title</h4>
                <input type='hidden' name='id' value={id}></input>
                <input type='text' name="title"   onChange={handleChange} className="ui brown block header" placeholder={title} />
                <p style={{color:"red"}}>{formErrors.title}</p>
                <h4>Content</h4>
                <input type='text'  name="content" onChange={handleChange} className="ui brown block header" placeholder={content}/>
                <p style={{color:"red"}}>{formErrors.content}</p>
                <h4>Image</h4>
                <input type='text'  name="img" onChange={handleChange} className="ui brown block header" placeholder={img} required/>
                    <p style={{color:"red"}}>{formErrors.img}</p>
       
                <button className="btn btn-info" type="submit">Apply edits</button>
              </div>
             
            </div>
            
          </div>
          </form>

        </div>
      )
      
      
      }
    </div>
:<Page404/>}
   </> 
  );
};

export default ProductDetails;
