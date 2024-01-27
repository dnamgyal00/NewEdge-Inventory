import { useState } from "react";
import { useCreateCategoryMutation } from "../slices/categoriesApiSlice";
import { useNavigate } from "react-router-dom";
import Modals from "../components/Modals";

const AddCategoryScreen = () => {
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  console.log(name, description);
  const [validated, setValidated] = useState(false);
  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
  };

  const handleModelAction = async () => {
    // Implement the logic for the confirmed action here
    console.log("Confirmed action");
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
    // Close the modal after handling the action
    setShowModal(false);
  };

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <h5 className="mb-0 text-black">Category Add</h5>
      <p className="mb-3">Create a new category</p>
      <div className="bg-white rounded p-4">
        <form
          id="add-category-form"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <div class="invalid-feedback">Please provide a description.</div>
          </div>
          <button
            type="submit"
            className="btn btn-primary py-1"
            disabled={isLoading}
            onClick={() => {
              const form = document.getElementById("add-category-form");
              const formFields = form.querySelectorAll(
                "input, select, textarea"
              );

              // Check if the form is valid and all fields are filled
              const isValid =
                form.checkValidity() &&
                Array.from(formFields).every(
                  (field) => field.value.trim() !== ""
                );

              if (isValid) {
                setShowModal(true);
              } else {
                // If not valid, trigger form validation
                setValidated(true);
              }
            }}
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
          {/* ConfirmModal component */}
          <Modals
            show={showModal}
            onHide={() => setShowModal(false)}
            onConfirm={handleModelAction}
            title="Add Confirm"
            body="Are you sure you want to perform this action?"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCategoryScreen;
