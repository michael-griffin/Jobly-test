import { Link } from "react-router-dom";
import "./CompanyCard.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "./userContext";

/** Company card: displays as one of many in list of companies
 * ALSO clicking a card opens up a company detail page, which has a list
 * of jobs relevant to that company. Passes company handle to company detail
 * list (so that fetch can be done).
 */
function CompanyCard({ name, handle, description, logoUrl }) {

  const { user } = useContext(userContext);
  const navigate = useNavigate();

  function goToCompanyForm() {
    console.log('clicked gotoform');
    const companyInfo = { name, handle, description, logoUrl };
    navigate("/companies/editform", {state: companyInfo});
  }

  return (
    <div className="CompanyCard">
      <Link className="CompanyCard-Link" to={`/companies/${handle}`}>
        <h6>{name} {logoUrl && <img src={logoUrl} alt={name} />}</h6>
      </Link>
      <p><small>{description}</small></p>
      {user.isAdmin && <button onClick={goToCompanyForm}>Edit</button>}
    </div>
  );
}

export default CompanyCard;