import { useState, useContext } from "react";
import Alert from "./Alert";
import userContext from "./userContext";
import Success from "./Success";


/** Form for updating a user's profile */
function ProfileForm({ handleSubmit }) {

  const allData = useContext(userContext);
  const userData = allData.user;

  const initialFormData = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email
  };


  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function submitForm(evt) {
    evt.preventDefault();

    async function updateUser() {
      try {
        await handleSubmit(formData);
        setSuccessMessage("User profile successfully updated!");
        setErrors(null);
      } catch (error) {
        const errorMessages = error[0].message;

        setErrors(errorMessages);
      }
    }
    updateUser();
  }

  function handleFormChange(evt) {
    const { name, value } = evt.target;
    setFormData(prevFormData => (
      { ...prevFormData, [name]: value }
    ));
  }

  return (
    <>
      <form className="ProfileForm" onSubmit={submitForm}>
        <label className="form-label" htmlFor="username">Username</label>
        <input onChange={handleFormChange}
          disabled={true}
          value={userData.username}
          placeholder="Username"
          name="username" />
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
        <br />
        <button>Submit</button>
      </form>

      {errors ?
        <Alert errors={errors} /> :
        successMessage && <Success successMessage={successMessage} />
      }
    </>
  );
}



export default ProfileForm;