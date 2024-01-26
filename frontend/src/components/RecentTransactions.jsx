import React from "react";
import { Table } from "react-bootstrap";
import { useGetRecentTransactionsQuery } from "../slices/dashboardApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { format } from "date-fns";
import { LinkContainer } from "react-router-bootstrap";

const RecentTransactions = () => {
  const {
    data: { data: transactions } = {},
    isLoading,
    isError,
    error,
  } = useGetRecentTransactionsQuery();

  console.log(transactions);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.code?.message || error.error}
        </Message>
      ) : (
        <div className="container-fluid pt-4 px-4">
          <div className="bg-white text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Recent Transactions</h6>
              <LinkContainer to="/transactions-history">
                <a>Show All</a>
              </LinkContainer>
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
                  {transactions &&
                    transactions.map((transaction) => (
                      <tr>
                        <LinkContainer
                          to={{
                            pathname: `/home/item/${transaction.item.name}`,
                            search: `?id=${transaction.item.id}`,
                          }}
                        >
                          <td>{transaction.item.name}</td>
                        </LinkContainer>
                        <LinkContainer
                          to={{
                            pathname: `/home/category/${transaction.item.category.name}`,
                            search: `?id=${transaction.item.category.id}`,
                          }}
                        >
                          <td>{transaction.item.category.name}</td>
                        </LinkContainer>

                        <td>{transaction.transaction_type}</td>
                        <td>{transaction.item.unit}</td>
                        <td>{transaction.qty}</td>
                        <td>{format(transaction.created_at, "dd-mm-yyyy")}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentTransactions;
