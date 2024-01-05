import { useGetTransactionsQuery } from "../slices/transactionsApiSlice";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaPlus, FaMinus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
// import { MdOutlineComputer } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";
import { BsEye } from "react-icons/bs";
import { Breadcrumb } from "react-bootstrap";

const TransactionScreen = () => {
  const {
    data: { data: transactions } = {},
    isLoading,
    isError,
  } = useGetTransactionsQuery();
  console.log(transactions);
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Transaction</Breadcrumb.Item>
        <Breadcrumb.Item active>Transaction History</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-black mb-0"> Transaction History</h5>
          Manage your transactions
        </div>
        <div className="">
          <LinkContainer to="/stock-in">
            <Button variant="primary" size="sm" className="px-4 py-1 me-3">
              {" "}
              <FaPlus className="me-2 mb-1" />
              Stock In
            </Button>
          </LinkContainer>
          <LinkContainer to="/stock-out">
            <Button variant="primary" size="sm" className="px-4 py-1">
              {" "}
              <FaMinus className="me-2 mb-1" />
              Stock Out
            </Button>
          </LinkContainer>
        </div>
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
        <Table responsive="sm">
          <thead className="bg-light">
            <tr>
              <th className="text-black border-0">Item Name</th>
              <th className="text-black border-0">Category</th>
              <th className="text-black border-0">Stock In/Out</th>
              <th className="text-black border-0">Unit</th>
              <th className="text-black border-0">Qty</th>
              <th className="text-black border-0">Date</th>
              <th className="text-black border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.item.name}</td>
                  <td>{transaction.item.category.name}</td>
                  <td>{transaction.transaction_type}</td>
                  <td>{transaction.item.unit}</td>
                  <td>{transaction.qty}</td>
                  <td>{transaction.created_at}</td>
                  <td>
                    <BsEye /> <FiEdit3 /> <FaTrashAlt />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionScreen;
