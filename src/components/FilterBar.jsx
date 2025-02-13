const FilterBar = ({ setFilters }) => {
  const handleBreedChange = (e) => setFilters((prev) => ({ ...prev, breed: e.target.value }));
  const handleSortChange = (e) => setFilters((prev) => ({ ...prev, sort: e.target.value }));

  return (
    <div className="filterBar">
      <h2>Filter to find your dream dog</h2>
      <input type="text" placeholder="Filter by breed" onChange={handleBreedChange} />
      <select onChange={handleSortChange}>
        <option value="breed:asc">Breed (A-Z)</option>
        <option value="breed:desc">Breed (Z-A)</option>
      </select>
    </div>
  );
};

export default FilterBar;
