import { Table, Button, Collapse, Row, Form, Col, Pagination } from "react-bootstrap";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {useGetItemsQuery,useSearchItemByNameQuery,} from "../slices/itemsApiSlice";
import { useGetCategoriesOnlyQuery } from "../slices/categoriesApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
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

  //Filters
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
    const { value } = e.target;
    setSearch(value);
  };


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
  } = useGetCategoriesOnlyQuery();

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-black mb-0"> Item List</h5>
          Manage your item
        </div>
        <LinkContainer to="/home/item/add-item">
          <Button variant="primary" size="sm" className="px-4 py-1">
            {" "}
            <FaPlus className="me-2 mb-1" />
            Add Item
          </Button>
        </LinkContainer>
      </div>

      <div className="bg-white rounded p-4">
        <div className="input-group d-flex mb-3">
          <div className="input-group-prepend me-1">
            {/* Filter Action*/}
            <span
              className={`input-group-text  ${showFilters ? "bg-primary" : "bg-white"
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
          <div className="border border-solid d-flex py-0 rounded">
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
              autoComplete="off"
            />
            <div className="search-results bg-white position-absolute top-100  translate-middle-x px-3 mt-1 rounded">
              {itemSearchResults &&
                itemSearchResults.map((result) => (
                  <LinkContainer
                    key={result.id}
                    to={{ pathname: `/home/item/${result.name}` }}
                    onClick={() => dispatch(setItemId(result.id))}
                  >
                    <div
                      key={result.id}
                      className="border-0 clickable-cell py-1"
                    >
                      {" "}
                      {result.name}{" "}
                    </div>
                  </LinkContainer>
                ))}
            </div>

            {/* EDIT THIS SEARCH RESULT DISPLAY */}
          </div>

        </div>

        {/* Dropdown Filters*/}
        <Collapse in={open}>
          <div id="example-collapse-text">

            <Row className="mb-3">

              <Form.Group
                as={Col}
                controlId="formGridCategory"
                md={2}
                xs={6}
                className="mb-2"
              >
                <Form.Label>Category</Form.Label>
                <Form.Select
                  className="py-1 shadow-none"
                  onChange={(e) =>
                    setCategoryName(e.target.value)
                  }
                >
                  <option defaultValue value="">
                    All
                  </option>
                  {categories &&
                    categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.name}
                        id={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
         

            </Row>
          </div>
        </Collapse>


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
