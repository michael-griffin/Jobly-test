import { useState } from "react";
import Alert from "./Alert";


/** Form for signing up a new user */
function SignupForm({ handleSubmit }) {

  //build form, should have function to setUser (passed down from App)

  // const initialFormData = {
  //   username: "",
  //   password: "",
  //   firstName: "",
  //   lastName: "",
  //   email: ""
  // };
  const initialFormData = {
    username: "test",
    password: "password",
    firstName: "test",
    lastName: "user",
    email: "test@email.com"
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(null);


  function submitForm(evt) {
    evt.preventDefault();

    async function signupUser() {
      try {
        await handleSubmit(formData);
      } catch (error) {
        setErrors(error);
      }
    }
    signupUser();
  }

  function handleFormChange(evt) {
    const { name, value } = evt.target;
    setFormData(prevFormData => (
      { ...prevFormData, [name]: value }
    ));
  }

  return (
    <>
      <form className="SignupForm" onSubmit={submitForm}>
        <label className="form-label" htmlFor="username">Username</label>
        <input onChange={handleFormChange}
          value={formData.username}
          placeholder="Username"
          name="username" />
        <label className="form-label" htmlFor="password">Password</label>
        <input onChange={handleFormChange}
          type="password"
          value={formData.password}
          placeholder="Password"
          name="password" />
        <label className="form-label" htmlFor="firstName">First name</label>
        <input onChange={handleFormChange}
          value={formData.firstName}
          placeholder="First name"
          name="firstName" />
        <label className="form-label" htmlFor="lastName">Last name</label>
        <input onChange={handleFormChange}
          value={formData.lastName}
          placeholder="Last name"
          name="lastName" />
        <label className="form-label" htmlFor="email">Email</label>
        <input onChange={handleFormChange}
          value={formData.email}
          placeholder="Email"
          name="email" />
        <button>Submit</button>
      </form>

      {errors && <Alert errors={errors} />}
    </>
  );
}



export default SignupForm;