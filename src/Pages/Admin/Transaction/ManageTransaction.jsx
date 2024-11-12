import React, { useEffect, useState } from 'react';
import { useGetUserTransactionHistoryQuery } from "../../../features/api/userApi";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import CustomTable from '../../../components/Table/CustomTable';
import Pagination from '../../../components/Table/Pagination';

const ManageTransaction = () => {
  const notyf = new Notyf();

  // Fetching the user transaction history
  const { data: users, isLoading, error } = useGetUserTransactionHistoryQuery();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    if (error) {
      notyf.error('Failed to load transactions');
    }
    if (users) {
      // Extract transactions for users who have transaction data
      const allTransactions = users
        .filter(user => user.transactions && user.transactions.length > 0)
        .flatMap(user => 
          user.transactions.map(transaction => ({
            id: transaction.id,
            userName: user.name, // Add the user's name for better identification
            price: `$${transaction.price}`,
            coins: transaction.coins,
            date: new Date(transaction.createdAt).toLocaleString(),
          }))
        );
      setTransactions(allTransactions);
    }
  }, [users, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Pagination logic
  const indexOfLastTransaction = currentPage * entriesPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - entriesPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / entriesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle entries per page change
  const handleEntriesChange = (newEntriesPerPage) => {
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1);
  };

  // Table headers and data
  const tableHeaders = ["Transaction ID", "User Name" , "Price", "Coins","Date"];
  const tableData = currentTransactions.map(transaction => ({
    "Transaction ID": transaction.id,
    "User Name": transaction.userName,
    "Price": transaction.price,
    "Coins": transaction.coins,
    "Date": transaction.date,
  }));

  return (
    <div className="container mx-5">
      <h1 className="text-xl mb-5">Manage Transactions</h1>

      <CustomTable
        headers={tableHeaders}
        data={tableData}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        entriesPerPage={entriesPerPage}
        onEntriesChange={handleEntriesChange}
      />
    </div>
  );
};

export default ManageTransaction;
