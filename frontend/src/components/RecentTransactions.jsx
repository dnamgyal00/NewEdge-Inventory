import React from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Table
} from "react-bootstrap";
import { useGetRecentTransactionsQuery } from "../slices/dashboardApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const RecentTransactions = () => {
  const {
    data: { data: transactions } = {},
    isLoading,
    isError,
    error,
  } = useGetRecentTransactionsQuery();
  return (
    <>{isLoading?(
      <Loader/>
    ): isError? (
      <Message variant="danger">
        {error?.code?.message || error.error}
      </Message>
    ):(
      <div className="container-fluid pt-4 px-4">
      <div className="bg-white text-center rounded p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0">Recent Transactions</h6>
          <a href="/transactions-history">Show All</a>
        </div>
        <div className="table-responsive">
          <Table responsive="sm" className="position-relative">
            <thead className="bg-light">
              <tr>
                <th className="text-black border-0">Item Name</th>
                <th className="text-black border-0">Category</th>
                <th className="text-black border-0">Stock In/Out</th>
                <th className="text-black border-0">Unit</th>
                <th className="text-black border-0">Qty</th>
                <th className="text-black border-0">Date</th>
              </tr>
            </thead>
            <tbody>
             {transactions && transactions.map((transaction) =>(
              <tr key={transaction.id} >
                <td>{transaction.item.name}</td>
                    <td>{transaction.item.category.name}</td>
                    <td>{transaction.transaction_type}</td>
                    <td>{transaction.item.unit}</td>
                    <td>{transaction.qty}</td>
                    <td>{transaction.created_at}</td>
              </tr>
             )

             )}
            </tbody>
          </Table>
        </div>
        {/* <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-dark">
                <th scope="col">
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th scope="col">Date</th>
                <th scope="col">Invoice</th>
                <th scope="col">Customer</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input className="form-check-input" type="checkbox" />
                </td>
                <td>01 Jan 2045</td>
                <td>INV-0123</td>
                <td>Jhon Doe</td>
                <td>$123</td>
                <td>Paid</td>
                <td>
                  <a className="btn btn-sm btn-primary" href="">
                    Detail
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <input className="form-check-input" type="checkbox" />
                </td>
                <td>01 Jan 2045</td>
                <td>INV-0123</td>
                <td>Jhon Doe</td>
                <td>$123</td>
                <td>Paid</td>
                <td>
                  <a className="btn btn-sm btn-primary" href="">
                    Detail
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <input className="form-check-input" type="checkbox" />
                </td>
                <td>01 Jan 2045</td>
                <td>INV-0123</td>
                <td>Jhon Doe</td>
                <td>$123</td>
                <td>Paid</td>
                <td>
                  <a className="btn btn-sm btn-primary" href="">
                    Detail
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <input className="form-check-input" type="checkbox" />
                </td>
                <td>01 Jan 2045</td>
                <td>INV-0123</td>
                <td>Jhon Doe</td>
                <td>$123</td>
                <td>Paid</td>
                <td>
                  <a className="btn btn-sm btn-primary" href="">
                    Detail
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <input className="form-check-input" type="checkbox" />
                </td>
                <td>01 Jan 2045</td>
                <td>INV-0123</td>
                <td>Jhon Doe</td>
                <td>$123</td>
                <td>Paid</td>
                <td>
                  <a className="btn btn-sm btn-primary" href="">
                    Detail
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
    )}</>
  );
};

export default RecentTransactions;
