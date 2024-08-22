import { InputText } from "primereact/inputtext";

export const tableSearchFunction = (
  e,
  filters,
  setFilters,
  setGlobalFilterValue
) => {
  const value = e.target.value;

  let _filters = { ...filters };
  _filters["global"].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};

export const tableSearchUI = (globalFilterValue, onGlobalFilterChange) => {
  return (
    <div className=" flex justify-end">
      <span>
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );
};
