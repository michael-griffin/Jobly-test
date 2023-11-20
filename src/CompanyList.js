import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import JoblyApi from "./api";
import _ from "lodash"; //possible alternative: import {debounce} from "lodash"


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

function CompanyList() {

  const [companies, setCompanies] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const nPages = Math.ceil(companies.length/perPage);

  function getCompaniesOnPage(){
    let start = (pageNum-1)*perPage;
    let finish = Math.min(companies.length, start+perPage);
    return companies.slice(start, finish);
  }

  useEffect(function getCompanies() {
    async function getCompaniesFromApi() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    getCompaniesFromApi();
  }, []);


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

export default CompanyList;
