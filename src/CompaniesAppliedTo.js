import { useState, useEffect, useContext } from "react";
import CompanyCard from "./CompanyCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import JoblyApi from "./api";
import _ from "lodash"; //possible alternative: import {debounce} from "lodash"
import userContext from "./userContext";


/* Displays a list of companies (which can be narrowed by Search)
 *
 * Props: None
 *
 * State:
 *  - companies: The list of companies
 *  - isError: Whether the API call is successful/not. If not, redirects to NotFound page.
 *
 * App -> RoutesList -> CompanyList -> CompanyCard
 */
const perPage = 20;

function CompaniesAppliedTo() {
  const { user } = useContext(userContext);

  const [companies, setCompanies] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const nPages = Math.ceil(companies.length/perPage);

  function getCompaniesOnPage(){
    let start = (pageNum-1)*perPage;
    let finish = Math.min(companies.length, start+perPage);
    return companies.slice(start, finish);
  }

  useEffect(function getCompaniesAppliedTo() {
    async function getCompaniesAppliedToFromApi() {

      // Would prefer to put the below logic into a method in the api
      const allCompanies = await JoblyApi.getCompanies();
      const allJobs = await JoblyApi.getJobs();

      const jobsAppliedTo = allJobs.filter(job => user.applications.includes(job.id));
      const handles = jobsAppliedTo.map(job => job.companyHandle)
      const companies = allCompanies.filter(company => handles.includes(company.handle));

      setCompanies(companies);
    }
    getCompaniesAppliedToFromApi();
  }, [user]);


  const debounceTime = 1000; //time in ms
  const debounceSearch = _.debounce(searchCompaniesFromApi, debounceTime);

  async function searchCompaniesFromApi(searchTerm) {
    const companies = await JoblyApi.getCompanies(searchTerm);
    setCompanies(companies);
  }

  function makeCompanyCardList() {
    const companiesOnPage = getCompaniesOnPage();

    return companiesOnPage.map(company => (
      <CompanyCard key={company.handle}
        handle={company.handle}
        name={company.name}
        description={company.description}
        logoUrl={company.logoUrl}
      />
    ));
  }

  return (
    <div className="CompanyList">
      <SearchBar handleSearch={debounceSearch} />
      {makeCompanyCardList()}
      <Pagination pageNum={pageNum} nPages={nPages} setPageNum={setPageNum} />
    </div>
  );
}

export default CompaniesAppliedTo;
