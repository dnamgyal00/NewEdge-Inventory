import { useParams } from "react-router-dom";
import { useGetCategoryDetailsQuery } from "../slices/categoriesApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CategoryDetailsScreen = () => {
  const { id: categoryId } = useParams();
  console.log(categoryId);

  const {
    data: { data: category } = {},
    isLoading,
    isError,
    error,
  } = useGetCategoryDetailsQuery(categoryId);
  console.log(category);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.code?.message || error.error}
        </Message>
      ) : (
        <div>
          {/* content starts form here */}
          <p>Name: {category.name}</p>
          <p>Description: {category.description}</p>
        </div>
      )}
    </>
  );
};

export default CategoryDetailsScreen;
