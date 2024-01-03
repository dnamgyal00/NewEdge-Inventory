import React from "react";

const AddCategoryScreen = () => {
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <h5 className="mb-0 text-black">Category Add</h5>
      <p className="mb-3">Create new category</p>
      <div className="bg-white rounded p-4">
        <form>
          <div className="mb-3">
            <label for="exampleInputText" className="form-label text-black">
              Category Name
            </label>
            <input
              type="text"
              className="form-control w-50"
              id="exampleInputText"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label for="floatingTextarea" className="form-label text-black">
              Description
            </label>
            <textarea
              className="form-control"
              id="floatingTextarea"
              rows={5}
              // style="height: 150px;"
            ></textarea>
          </div>
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
