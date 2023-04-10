import React, { useState } from "react";

const UserForm = ({ onSubmit, user = {} }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
