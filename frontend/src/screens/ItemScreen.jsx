import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { LinkContainer } from "react-router-bootstrap";
import { useGetItemsQuery } from "../slices/itemsApiSlice";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ItemScreen = () => {
  const {
    data: { data: items } = {},
    isLoading,
    isError,
    error,
  } = useGetItemsQuery();

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item herf='/item-list'>Product</Breadcrumb.Item>
        <Breadcrumb.Item active>Item List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-black mb-0"> Item List</h5>
          Manage your item
        </div>
        <LinkContainer to="/admin/add-item">
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
            <span className="input-group-text bg-white border-1">
              <FiFilter />{" "}
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
              style={{ boxShadow: "none" }}
            />
          </div>
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
                <th className="text-black border-0">Item Name</th>
                <th className="text-black border-0">Category</th>
                <th className="text-black border-0">Brand Name</th>
                <th className="text-black border-0">Price</th>
                <th className="text-black border-0">Unit</th>
                <th className="text-black border-0">Qty</th>
                <th className="text-black border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((item) => (
                  <tr key={item.id}>
                    {/* <LinkContainer to='/item-list/item-details'>
                      <td>{item.name}</td>
                    </LinkContainer> */}
                    <LinkContainer to={`/item-list/item-details/${item.id}`}>
                      <td>{item.name}</td>
                    </LinkContainer>
                    <td>{item.category.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.unit_price}</td>
                    <td>{item.unit}</td>
                    <td>{item.qty_on_hand}</td>
                    <td>test</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ItemScreen;
