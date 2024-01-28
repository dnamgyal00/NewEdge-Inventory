import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetItemsQuery,
  useSearchItemByNameQuery,
} from "../slices/itemsApiSlice";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { Collapse } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setItemId } from "../slices/itemSlice";
import { setCategoryId } from "../slices/categorySlice";

const ItemScreen = () => {
  const dispatch = useDispatch();
  //Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  //Filter
  const [categoryName, setCategoryName] = useState("");
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpen(!open);
    setCategoryName("");
  };

  const [search, setSearch] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch(value);
  };
  //console.log('Hello',search)

  //api calls
  const {
    data: { data: items } = {},
    isLoading,
    isError,
    error,
  } = useGetItemsQuery({ categoryName, currentPage });

  const {
    data: { data: itemSearchResults } = {},
    isLoading2,
    isError2,
    error2,
  } = useSearchItemByNameQuery(search ? search : "1");
  console.log(itemSearchResults);

  const {
    data: { data: categories } = {},
    isLoading3,
    isError3,
  } = useGetCategoriesQuery();

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-black mb-0"> Item List</h5>
          Manage your item
        </div>
        <LinkContainer to="/home/category/add-item">
          <Button variant="primary" size="sm" className="px-4 py-1">
            {" "}
            <FaPlus className="me-2 mb-1" />
            Add Item
          </Button>
        </LinkContainer>
      </div>

      <div className="bg-white rounded p-4">
        <div className="input-group d-flex mb-1">
          <div className="input-group-prepend me-1">
            {/* Filter Action*/}
            <span
              className={`input-group-text  ${
                showFilters ? "bg-primary" : "bg-white"
              }`}
              onClick={toggleFilters}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              {showFilters ? (
                // Cross Button when filters are displayed
                <FaTimes className="text-white" />
              ) : (
                // Filter Icon when filters are hidden
                <FiFilter />
              )}
            </span>
          </div>

          {/* Search Bar */}
          <div className="d-flex py-0 border border-solid d-flex rounded">
            <span className="input-group-text bg-white border-0">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="form-control border-0 px-0 py-0"
              name="search"
              value={search}
              onChange={handleInputChange}
              style={{ boxShadow: "none" }}
            />

          </div>
        </div>
         {/* EDIT THIS SEARCH RESULT DISPLAY */}
         {itemSearchResults && itemSearchResults.map((result)=>(
              <LinkContainer key={result.id} to={{ pathname: `/home/item/${result.name}`}}
                    onClick={() => dispatch(setItemId(result.id))}>
                    <div key={result.id} className="border-0 "> {result.name} </div> 
             </LinkContainer>
            )) 
            }

        {/* Filter Options*/}
        <div className="input-group mb-3  ">
          <Collapse in={open}>
            <div id="example-collapse-text">
              <DropdownButton
                variant="white"
                id="dropdown-menu show"
                className="border border-solid rounded mt-2 lh-1"
                title="Choose Category"
              >
                <Dropdown.Item onClick={() => setCategoryName("")}>
                  All
                </Dropdown.Item>

                {categories &&
                  categories.map((category) => (
                    <Dropdown.Item
                      key={category.id}
                      onClick={() => setCategoryName(category.name)}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </div>
          </Collapse>
        </div>

        {/* <Message variant='danger'>test</Message> */}
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {error?.code?.message || error.error}
          </Message>
        ) : (
          <Table responsive="sm">
            <thead className="bg-light">
              <tr>
                {/* <th className="text-black border-0">Image</th> */}
                <th className="text-black border-0">Name</th>
                <th className="text-black border-0">Category</th>
                <th className="text-black border-0">Brand Name</th>
                <th className="text-black border-0">Price</th>
                <th className="text-black border-0">Unit</th>
                <th className="text-black border-0">Qty</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((item) => (
                  <tr key={item.id}>
                    {/* <td>
                            {item.image && (
                              <img
                                src={item.image} // Assuming item.image contains the URL
                                alt={`Image for ${item.name}`}
                                style={{ maxWidth: '100px', maxHeight: '100px' }} // Set max width and height as per your design
                              />
                            )}
                            </td> */}
                    <LinkContainer
                      to={{ pathname: `/home/item/${item.name}` }}
                      onClick={() => dispatch(setItemId(item.id))}
                    >
                      <td className="clickable-cell">{item.name}</td>
                    </LinkContainer>
                    <LinkContainer
                      to={{
                        pathname: `/home/category/${item.category.name}`,
                      }}
                      onClick={() => dispatch(setCategoryId(item.category.id))}
                    >
                      <td className="clickable-cell">{item.category.name}</td>
                    </LinkContainer>
                    <td>{item.brand}</td>
                    <td>{item.unit_price}</td>
                    <td>{item.unit}</td>
                    <td>{item.qty_on_hand}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}

        {/* Pagination */}
        {items && items.length > 0 && (
          <nav aria-label="Page navigation example mb-5">
            <ul className="pagination justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={handlePrevPage}
                  disabled={currentPage == 1}
                />
                <Pagination.Next
                  onClick={handleNextPage}
                  disabled={items.length < 10}
                />
              </Pagination>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default ItemScreen;
