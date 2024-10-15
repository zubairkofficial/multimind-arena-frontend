import React from 'react';

const AdminUsers = ({ users }) => {
  const handleEdit = (user) => {
    // Implement edit functionality
    console.log('Edit user:', user);
  };

  const handleDelete = (user) => {
    // Implement delete functionality
    console.log('Delete user:', user);
  };

  return (
    <div>
      <h2 className="text-white">User List</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Email</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => (
            <tr key={user.id || index}>
              <td>{index + 1}</td>
              <td>{`${user.name}`}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  className="btn btn-sm btn-primary me-2"
                >
                  <i className="fa fa-pencil"></i> {/* Font Awesome icon */}
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="btn btn-sm btn-danger"
                >
                  <i className="fa fa-trash"></i> {/* Font Awesome icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
