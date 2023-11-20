import SearchBar from "./SearchBar";
import JobCardList from "./JobCardList";
import { useEffect, useState} from "react";
import JoblyApi from './api';
import Pagination from "./Pagination";
import _ from "lodash"; //possible alternative: import {debounce} from "lodash"


/* Displays a list of jobs (which can be narrowed by Search)
 *
 * Props: None
 *
 * State:
 *  - jobs: The list of jobs
 *  - isError: Whether the API call is successful/not. If not, redirects to NotFound page.
 *
 * App -> RoutesList -> JobList -> JobCardList -> JobCard
 */
const perPage = 20;

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const nPages = Math.ceil(jobs.length/perPage);

  function getJobsOnPage(){
    let start = (pageNum-1)*perPage;
    let finish = Math.min(jobs.length, start+perPage);
    return jobs.slice(start, finish);
  }

  useEffect(function getJobs() {
    async function getJobsFromApi() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobsFromApi();
  }, []);

  const debounceTime = 1000; // Time in ms
  const debounceSearch = _.debounce(searchJobsFromApi, debounceTime);

  async function searchJobsFromApi(searchTerm) {
    const jobs = await JoblyApi.getJobs(searchTerm);
    setJobs(jobs);
  }

  return (
    <div className="JobList">
      <SearchBar handleSearch = {debounceSearch} />
      <JobCardList jobs={getJobsOnPage()} />
      <Pagination pageNum={pageNum} nPages={nPages} setPageNum={setPageNum} />
    </div>
  );
}

export default JobList;
