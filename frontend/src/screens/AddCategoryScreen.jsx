import React from "react";

const AddCategoryScreen = () => {
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <h5 className="mb-0 text-black">Category Add</h5>
      <p className="mb-3">Create new category</p>
      <div className="bg-white rounded p-4">
        {/* <h6 className="mb-4">Basic Form</h6> */}
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Category Name
            </label>
            <input
              type="email"
              className="form-control w-50"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          {/* <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div> */}
          <div className="mb-3">
            <label for="floatingTextarea" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="floatingTextarea"
              rows={5}
              // style="height: 150px;"
            ></textarea>
          </div>
          {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div> */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>{" "}
          <button type="submit" className="btn btn-danger text-white" size="sm">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryScreen;
