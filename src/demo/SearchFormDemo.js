import { useState } from "react";

function SearchForm({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchTermChange(evt) {
    const term = evt.target.value;
    setSearchTerm(term);
    handleSearch(searchTerm);
  }

  // function submitForm(evt) {
  //   evt.preventDefault();
  //   handleSubmit(searchTerm);
  // }

  return (
    <form>
      <input onChange={handleSearchTermChange}
        value={searchTerm}
        placeholder="Search"
        name="search" />
    </form>
  );

}

export default SearchForm;
