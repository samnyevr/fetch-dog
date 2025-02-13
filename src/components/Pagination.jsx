const Pagination = ({ totalResults, filters, setFilters }) => {
  const totalPages = Math.ceil(totalResults / 50);
  
  return (
    <div className="pagination">
      <button disabled={filters.page === 0} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}>
        Previous
      </button>
      <span>Page {filters.page + 1} of {totalPages}</span>
      <button disabled={filters.page >= totalPages - 1} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
