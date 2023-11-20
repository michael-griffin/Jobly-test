import JobCard from "./JobCard";


/** Displays job cards in a list with details displayed, given a list of jobs. */
function JobCardList({ jobs }) {

  return (
    <div className="JobCardList">
      {jobs.map(job => (
        <JobCard key={job.id} jobId={job.id} title={job.title} companyHandle={job.companyHandle}
          equity={job.equity} salary={job.salary} />
      ))}
    </div>
  );
}


export default JobCardList;