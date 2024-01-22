import { useState } from "react";
import { useCreateCategoryMutation } from "../slices/categoriesApiSlice";
import { useNavigate } from "react-router-dom";

const AddCategoryScreen = () => {
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  console.log(name, description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createCategory({
        name,
        description,
      }).unwrap();
      console.log(result);
      navigate("/category");
    } catch (err) {
      if (err.data) {
        console.error("Error creating category:", err.data);
      } else {
        console.error("Error creating category:", err);
      }
    }
  };

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <h5 className="mb-0 text-black">Category Add</h5>
      <p className="mb-3">Create a new category</p>
      <div className="bg-white rounded p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 col-md-3">
            <label htmlFor="exampleInputText" className="form-label text-black">
              Category Name
            </label>
            <input
              type="text"
              className="form-control py-1"
              id="exampleInputText"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3 col-sm-6 col-md-10">
            <label htmlFor="floatingTextarea" className="form-label text-black">
              Description
            </label>
            <textarea
              className="form-control py-2"
              id="floatingTextarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary py-1"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>{" "}
          <button
            type="button"
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
