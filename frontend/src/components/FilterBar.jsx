const MONTHS = [
  { value: '', label: 'All Months' },
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export default function FilterBar({
  filterType,
  onFilterTypeChange,
  filterValues,
  onFilterValueChange,
  onClear,
  onOpenAddModal,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-left">
        <div className="filter-group">
          <label htmlFor="filter-type">Filter by:</label>
          <select
            id="filter-type"
            className="filter-select"
            value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value)}
          >
            <option value="all">All Employees</option>
            <option value="id">By ID</option>
            <option value="name">By Name</option>
            <option value="dept">By Department</option>
            <option value="date">By Joining Date</option>
          </select>
        </div>

        {filterType !== 'all' && (
          <div className="filter-inputs">
            {filterType === 'id' && (
              <input
                type="number"
                className="search-input"
                placeholder="Enter ID"
                value={filterValues.id}
                onChange={(e) => onFilterValueChange('id', e.target.value)}
              />
            )}

            {filterType === 'name' && (
              <input
                type="text"
                className="search-input"
                placeholder="Enter Name"
                value={filterValues.name}
                onChange={(e) => onFilterValueChange('name', e.target.value)}
              />
            )}

            {filterType === 'dept' && (
              <input
                type="text"
                className="search-input"
                placeholder="Enter Department"
                value={filterValues.dept}
                onChange={(e) => onFilterValueChange('dept', e.target.value)}
              />
            )}

            {filterType === 'date' && (
              <>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  className="search-input"
                  placeholder="Year (e.g. 2023)"
                  value={filterValues.year}
                  onChange={(e) => {
                    // Accept digits only, strip non-digit characters as user types
                    const digitsOnly = e.target.value.replace(/\D/g, '');
                    onFilterValueChange('year', digitsOnly);
                  }}
                />
                <select
                  className="filter-select"
                  value={filterValues.month}
                  onChange={(e) =>
                    onFilterValueChange('month', e.target.value)
                  }
                >
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        )}

        <button
          type="button"
          className="btn btn-secondary btn-clear"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      <button
        type="button"
        className="btn btn-add"
        onClick={onOpenAddModal}
      >
        + Add Employee
      </button>
    </div>
  );
}
