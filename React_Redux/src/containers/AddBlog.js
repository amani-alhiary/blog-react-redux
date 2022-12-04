import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

function AddBlog() {
  const [modalShow, setModalShow] = useState(false); // Model show for add
  let id = Math.floor(Math.random() * 1000);
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost/ApiRedux/blogs.php", inputs)
      .then(function (response) {
        console.log(response.data);
      });
    setInputs("");
    id = 0;
    setModalShow(false);
    window.location.reload(false);
  };

  return (
    <div>
      <div>
        <Modal
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalShow}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Blog
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  className="form-control"
                  name="content"
                  rows="3"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="img">Image</label>
                <input
                  type="text"
                  className="form-control"
                  name="img"
                  onChange={handleChange}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                // onClick={props.onHide}
                type="submit"
              >
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* <h1 className="text-center mt-5" style={{padding:"20px"}}>Blogs</h1> */}
        <div className="container">
          <Button
            className="btn btn-success col-2 "
            variant="primary"
            onClick={() => setModalShow(true)}
          >
            Add Blog
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
