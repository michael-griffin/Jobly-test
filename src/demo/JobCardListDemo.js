import JobCard from "./JobCardDemo";


function JobCardListDemo({jobs}){

  function makeJobCards(){
    return jobs.map(job => (
      <JobCard key={job.id} title={job.title} companyHandle={job.companyHandle}
        equity={job.equity} salary={job.salary} />
    ))
  }

  return (
    <div className="JobCardList">
      {makeJobCards()}
    </div>
  )
}


export default JobCardListDemo;