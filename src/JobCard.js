import "./JobCard.css";
import { useContext } from "react";
import userContext from "./userContext";

//FIXME: make a real unApply function

/** Displays Job Card with info on company, salary, equity. */
function JobCard({title, companyHandle, salary, equity, jobId} ){
  const { user, apply } = useContext(userContext);

  const applications = user.applications;
  if (jobId === 1){
    console.log('user is: ', user);
    console.log('applications are: ', applications);
  }


  return (
    <div className="JobCard">
      <h6>{title}</h6>
      <p>{companyHandle}</p>
      <div><small>Salary: {salary}</small></div>
      <div><small>Equity: {equity}</small></div>
      {(Array.isArray(applications) && applications.includes(jobId)) ?
      <button onClick={() => console.log("unapplied!")}>Applied</button>
      :
      <button onClick={() => apply(user.username, jobId)}>Apply</button>
      }
    </div>
  )
}


export default JobCard;