import React from "react";
import { Table } from "react-bootstrap";
import { useGetRecentTransactionsQuery } from "../slices/dashboardApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { format } from "date-fns";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { setItemId } from "../slices/itemSlice";
import { setCategoryId } from "../slices/categorySlice";

const RecentTransactions = () => {
  const dispatch = useDispatch();
  const {
    data: { data: transactions } = {},
    isLoading,
    isError,
    error,
  } = useGetRecentTransactionsQuery();

  //console.log(transactions);
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
          <div className="bg-white text-center text-black rounded p-4">
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
                      <tr key={transaction.id}>
                        <LinkContainer
                          to={{
                            pathname: `/home/item/${transaction.item.name}`,
                          }}
                          onClick={() =>
                            dispatch(setItemId(transaction.item.id))
                          }
                        >
                          <td className="clickable-cell">
                            {transaction.item.name}
                          </td>
                        </LinkContainer>
                        <LinkContainer
                          to={{
                            pathname: `/home/category/${transaction.item.category.name}`,
                          }}
                          onClick={() =>
                            dispatch(
                              setCategoryId(transaction.item.category.id)
                            )
                          }
                        >
                          <td className="clickable-cell">
                            {transaction.item.category.name}
                          </td>
                        </LinkContainer>

                        <td>{transaction.transaction_type}</td>
                        <td>{transaction.item.unit}</td>
                        <td>{transaction.qty}</td>
                        <td>{format(transaction.created_at, "dd-MM-yyyy")}</td>
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
