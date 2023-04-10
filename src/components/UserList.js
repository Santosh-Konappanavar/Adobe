import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email}) ({user.phone})
          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => onDelete(user)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
