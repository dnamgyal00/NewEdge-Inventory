import React from "react";
import { Breadcrumb } from "react-bootstrap";

const AddCategoryScreen = () => {
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Product</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Category</Breadcrumb.Item>
      </Breadcrumb>
      <h5 className="mb-0 text-black">Category Add</h5>
      <p className="mb-3">Create new category</p>
      <div className="bg-white rounded p-4">
        <form>
          <div className="mb-3 col-md-4 col-sm-6 ">
            <label for="exampleInputText" className="form-label text-black">
              Category Name
            </label>
            <input
              type="text"
              className="form-control py-2"
              id="exampleInputText"
            />
          </div>
          <div className="mb-3 col-md-10">
            <label for="floatingTextarea" className="form-label text-black">
              Description
            </label>
            <textarea
              className="form-control py-2"
              id="floatingTextarea"
              rows={5}
              // style="height: 150px;"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary py-1">
            Submit
          </button>{" "}
          <button
            type="submit"
            className="btn btn-danger text-white py-1"
            size="sm"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryScreen;
