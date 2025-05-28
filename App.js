import React, { useState } from 'react';
import './style.css';

function App() {
  // State to hold form values and errors
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validation functions
  const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validate = () => {
    let newErrors = {};

    // Required fields
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (formData.username.length < 3 || formData.username.length > 10)
      newErrors.username = 'Username must be 3-10 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email))
      newErrors.email = 'Please provide a valid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6 || formData.password.length > 25)
      newErrors.password = 'Password must be 6-25 characters';

    if (!formData.password2) newErrors.password2 = 'Please confirm password';
    else if (formData.password !== formData.password2)
      newErrors.password2 = "Passwords don't match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = e => {
  e.preventDefault();
  if (validate()) {
    console.log('Signup successful with data:', formData); // <-- Added console log
    alert('Form submitted successfully!');
    // reset form if needed
    setFormData({
      username: '',
      email: '',
      password: '',
      password2: '',
    });
    setErrors({});
  }
};


  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h2>Sign Up</h2>

        <div className={`form-control ${errors.username ? 'error' : formData.username ? 'success' : ''}`}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Your Username"
            value={formData.username}
            onChange={handleChange}
          />
          <small>{errors.username}</small>
        </div>

        <div className={`form-control ${errors.email ? 'error' : formData.email ? 'success' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <small>{errors.email}</small>
        </div>

        <div className={`form-control ${errors.password ? 'error' : formData.password ? 'success' : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <small>{errors.password}</small>
        </div>

        <div className={`form-control ${errors.password2 ? 'error' : formData.password2 ? 'success' : ''}`}>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            placeholder="Confirm Your Password"
            value={formData.password2}
            onChange={handleChange}
          />
          <small>{errors.password2}</small>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
