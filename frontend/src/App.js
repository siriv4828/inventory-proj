import logo from './logo.svg';
import './App.css';

  import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const API_URL = "https://fastapi-backend.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = async () => {
    const res = await fetch(`${API_URL}/api/users?name=${name}`, {
      method: "POST",
    });
    const data = await res.json();
    alert(data.message);
    setUsers([...users, data.user]);
    setName("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React + FastAPI + PostgreSQL Demo</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleAdd}>Add User</button>

      <h2>Users List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
 
