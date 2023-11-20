
function JobCardDemo({title, companyHandle, salary, equity} ){

  return (
    <div className="JobCard">
      <h6>{title}</h6>
      <p>{companyHandle}</p>
      <div><small>Salary: {salary}</small></div>
      <div><small>Equity: {equity}</small></div>
    </div>
  )
}


export default JobCardDemo;