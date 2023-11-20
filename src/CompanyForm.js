import { useState } from "react";
import {useLocation} from 'react-router-dom';
import Alert from "./Alert";
import Success from "./Success";


/** Form for updating a user's profile */
function CompanyForm({ handleSubmit }) {

  const location = useLocation();
  // console.log('location is: ', location);
  const companyData = location.state;

  const initialFormData = {
    title: companyData.title,
    description: companyData.description,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function submitForm(evt) {
    evt.preventDefault();

    async function updateCompany() {
      try {
        await handleSubmit(companyData.handle, formData);
        setSuccessMessage("Company successfully updated!");
        setErrors(null);
      } catch (error) {
        const errorMessages = error[0].message;

        setErrors(errorMessages);
      }
    }
    updateCompany();
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
        <label className="form-label" htmlFor="companyHandle">Company Handle</label>
        <input onChange={handleFormChange}
          disabled={true}
          value={companyData.handle}
          placeholder="Company Handle"
          name="handle" />
        <label className="form-label" htmlFor="title">Title</label>
        <input onChange={handleFormChange}
          value={formData.title}
          placeholder="title"
          name="title" />
        <label className="form-label" htmlFor="description">Description</label>
        <input onChange={handleFormChange}
          value={formData.description}
          placeholder="Description"
          name="description" />
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


export default CompanyForm;