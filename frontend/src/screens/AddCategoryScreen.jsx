import { useState } from "react";
import { useCreateCategoryMutation } from "../slices/categoriesApiSlice";
import { useNavigate } from "react-router-dom";

const AddCategoryScreen = () => {
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null
  });
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "image" ? files[0] : value,
    }));
  };
  console.log(formData);

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append('name',formData.name);
      formDataObj.append('description',formData.description);
      formDataObj.append('image',formData.image)
      const result = await createCategory(formDataObj).unwrap();
      console.log(result);
      // navigate("/category");
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
        <form
          noValidate
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          onSubmit={handleSubmit}
        >
          <div className="mb-3 col-md-3">
            <label htmlFor="exampleInputText" className="form-label text-black">
              Category Name
            </label>
            <input
              type="text"
              className="form-control py-1"
              id="exampleInputText"
              aria-describedby="emailHelp"
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <div class="invalid-feedback">Please enter a category name.</div>
          </div>
          <div className="mb-3 col-sm-6 col-md-10">
            <label htmlFor="floatingTextarea" className="form-label text-black">
              Description
            </label>
            <textarea
              className="form-control py-2"
              id="floatingTextarea"
              name='description'
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
            <div class="invalid-feedback">Please provide a description.</div>
          </div>
          <div className="mb-3 col-sm-6 col-md-10">
            <label htmlFor="imageInput" className="form-label text-black">
              Category Image 
            </label>
            <input
              type="file"
              className="form-control py-2"
              id="image"
              name="image"
              onChange={handleInputChange}
              accept="image/*" 
              required
            />
            <div class="invalid-feedback">Please upload an image.</div>
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
