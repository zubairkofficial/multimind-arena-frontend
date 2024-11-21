import React, { useEffect, useState } from 'react';
import { useGetUserTransactionHistoryQuery } from "../../../features/api/userApi";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import CustomTable from '../../../components/Table/CustomTable';
import Pagination from '../../../components/Table/Pagination';
import Searchbar from "../../../components/Searchbar/Searchbar";

const ManageTransaction = () => {
  const notyf = new Notyf();

  // Fetching the user transaction history
  const { data: users, isLoading, error } = useGetUserTransactionHistoryQuery();
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
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

  const handleSearchChange = (query) => {
    setSearchText(query);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.userName.toLowerCase().includes(searchText.toLowerCase()) ||
    transaction.id.toString().toLowerCase().includes(searchText.toLowerCase()) ||
    transaction.price.toLowerCase().includes(searchText.toLowerCase()) ||
    transaction.date.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTransaction = currentPage * entriesPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - entriesPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / entriesPerPage);

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
  const tableHeaders = ["Transaction ID", "User Name", "Price", "Coins", "Date"];
  const tableData = currentTransactions.map(transaction => ({
    "Transaction ID": transaction.id,
    "User Name": transaction.userName,
    "Price": transaction.price,
    "Coins": transaction.coins,
    "Date": transaction.date,
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-3">
      <Searchbar
        heading="Manage Transactions"
        placeholder="Search by User Name, Transaction ID, or Date..."
        onSearch={handleSearchChange}
      />

      <div className="manage-arenas">
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
    </div>
  );
};

export default ManageTransaction;
