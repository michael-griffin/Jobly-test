import SearchForm from "./SearchFormDemo";
import JobCardList from "./JobCardListDemo";
import { useEffect, useState } from "react";
import JoblyApi from '../api';
import _ from "lodash"; //possible alternative: import {debounce} from "lodash"

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(function getJobs() {
    async function getJobsFromApi() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobsFromApi();
  }, []);

  //Pagination:
  //Idea: need a state for current page, oddly should maybe be derived from
  //jobs?
  //Have a page list component, which receives pagelist, and functions
  //to handle page turning
  let pageSize = 10;
  let maxPages = Math.ceil(jobs.length/pageSize);

  let pageArray = [...Array(maxPages+1).keys()].slice(1);
  let pageDisplay = pageArray.map(pageN => <div>{pageN}</div>)
  function nextPage() {
    if (currPage < maxPages){
      setPage(currPage + 1); //avoid callback pattern, don't jump ahead.
    }
  }

  function prevPage() {
    if (currPage > 1){
      setPage(currPage - 1); //avoid callback pattern, don't jump ahead.
    }
  }





  //Debounce
  const debounceTime = 1000; //time in ms
  const debounceSearch = _.debounce(searchJobsFromApi, debounceTime);

  async function searchJobsFromApi(searchTerm) {
    const jobs = await JoblyApi.getJobs(searchTerm);
    setJobs(jobs);
  }


  return (
    <div className="JobList">
      <SearchForm handleSearch={debounceSearch} />
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default JobList;
