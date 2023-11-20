import "./Pagination.css";


function Pagination({ pageNum, nPages, setPageNum}) {

  let arrPages = [...Array(nPages + 1).keys()].slice(1); //[1,2,3,...nPages]

  function prevPage(){
    if (pageNum > 1) setPageNum(prev => prev-1);
  }

  function nextPage(){
    if (pageNum < nPages) setPageNum(prev => prev+1);
  }


  return (
    <ul className="Pagination">
      <button  onClick={prevPage} disabled={pageNum === 1}>Prev</button>
      {arrPages.map((num, ind) => {
        return ((num === pageNum) ?
          <button key={ind} className="currentPage">{num}</button>
          :
          <button key={ind} onClick={() => setPageNum(num)}>{num}</button>);
      })}
      <button onClick={nextPage} disabled={pageNum === nPages}>Next</button>
    </ul>
  );
}


export default Pagination;