import { useEffect, useState } from "react";
import JobCardList from "./JobCardList";
import { useParams, Navigate } from "react-router-dom";
import JoblyApi from "./api";


/* Displays company info and a list of jobs particular to that company
 *
 * Props: None
 *
 * State:
 *  - company: The current company
 *  - isError: Whether the API call is successful/not. If not, redirects to NotFound page.
 *
 * CompanyList -> CompanyCard -> CompanyDetail -> JobCardList
 */
function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const [isError, setIsError] = useState(false);

  const params = useParams();
  const handle = params.handle;

  useEffect(function getJobsAndCompany() {
    async function fetchCompanyInfo() {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
      } catch (err){
        setIsError(true);
      }
    }
    fetchCompanyInfo();
  }, [handle]);

  return (
    <div className="CompanyDetail">
      {isError && <Navigate to="/NotFound" />}
      {company ?
        <>
          <h1>Jobs for {company.name}</h1>
          <p>{company.description}</p>
          <JobCardList jobs={company.jobs} />
        </>
        :
        <p>{"is loading"}</p>
      }

    </div>
  );
}


export default CompanyDetail;