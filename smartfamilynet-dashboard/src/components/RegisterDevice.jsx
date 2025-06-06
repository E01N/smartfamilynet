// src/pages/RegisterDevice.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterDevice = () => {
  const [mac, setMac] = useState('');
  const [childId, setChildId] = useState('');
  const [children, setChildren] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/children`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setChildren(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/devices/register`, {
        mac,
        childId,
        name: `${mac.substring(mac.length - 5)} device`, // example name
      });

      setMessage('Device registered successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to register device.');
    }
  };

  return (
    <div className="register-device">
      <h2>Register This Device</h2>

      <form onSubmit={handleSubmit}>
        <label>
          MAC Address:
          <input
            type="text"
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            placeholder="e.g. AA:BB:CC:DD:EE:FF"
            required
          />
        </label>

        <label>
          Assign to Child:
          <select
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            required
          >
            <option value="">-- Select Child --</option>
            {children.map((child) => (
              <option key={child._id} value={child._id}>
                {child.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterDevice;
