import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const ProductComponent = (props) => {
  //Delete
  const handleDel = (id) => {
    axios
      .delete(`http://localhost/ApiRedux/blogs.php/${id}/delete`)
      .then(function (response) {
        window.location.reload(false);
      });
  };
  if (props.search == "") {


    
    const renderList = props.currentBlogs.map((product) => {
      const { id, title, img, content } = product;

      return (
        <div className="col" key={id}>
       
         
            <div className="ui link cards">
              <div className="card">
                <div className="image">
                  <img src={img} alt={title} />
                </div>
                <div className="content">
                  <div className="header">{title}</div>
                  <div className="meta">{content}</div>
                </div>
                {sessionStorage.getItem("role") == "admin" ? (
                  <Button onClick={() => handleDel(id)} variant="danger">
                    Delete
                  </Button>
                ) : null}
                {sessionStorage.getItem("role") == "admin" ? (
                  <Link className="btn btn-info" to={`/product/${id}`}>
                    Edite
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
    
  
      );
    });
    return <>{renderList}</>;
  } else {
    const filteredData = props.all.filter((el) => {
      return el.title.toLowerCase().includes(props.search);
    });

    const renderList = filteredData.map((product) => {
      const { id, title, img, content } = product;
      return (
        <div className="col mb-5" key={id}>
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={img} alt={title} />
              </div>
              <div className="content">
                <div className="header">{title}</div>
                <div className="meta">{content}</div>
              </div>
              {sessionStorage.getItem("role") == "admin" ? (
                <Button onClick={() => handleDel(id)} variant="danger">
                  Delete
                </Button>
              ) : null}
              {sessionStorage.getItem("role") == "admin" ? (
                <Link className="btn btn-info" to={`/product/${id}`}>
                  Edit
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      );
    });
    return <>{renderList}</>;
  }
};

export default ProductComponent;
