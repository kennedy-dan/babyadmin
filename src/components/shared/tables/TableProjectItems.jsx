import React, {useState} from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

import { InputText } from 'primereact/inputtext';
import { tableSearchFunction, tableSearchUI } from './TableSearchFunction';
const TableProjectItems = ({data}) => {
    const customData = data
  const [rows, setRows] = useState(10);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  let searchBar = tableSearchUI(globalFilterValue, (e) =>
    tableSearchFunction(e, filters, setFilters, setGlobalFilterValue)
  );
    let columns = [
        {
          field: "id",
          header: "id",
          isSort: true,
          body: (rowData, options) => {
            return options.rowIndex + 1;
          },
        },
    
        {
          field: "name",
          header: "name",
          isSort: true,
          body: (rowData) => {
            return <p>{rowData.name}</p>;
          },
        },
    
        {
          field: "stock",
          header: "stock",
          body: (rowData, index) => {
            return <p>{rowData?.in_stock}</p>;
          },
        },

        {
            field: "price",
            header: "Price",
            body: (rowData, index) => {
              return <p>{rowData?.price}</p>;
            },
          }
      ];
    

    return (
        <div className="table-responsive">
           
           <DataTable
            value={customData}
            // loading={reservationHistory?.isLoading}
            // paginatorF
            paginator
            rows={rows}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "30rem" }}
            style={{ position: "inherit", fontSize:'16px' }}
            header={searchBar}
            globalFilterFields={[
                "name",
                "price",
                // "reserved_start_time",
                // "comment",
              ]}
          >
            {columns.map((col, i) => {
              return (
                <Column
                  key={i}
                  field={col?.field}
                  header={col?.header}
                  body={col?.body}
                //   headerStyle={{ backgroundColor: '#f0f0f0' }}
                />
              );
            })}
          </DataTable>
          
        </div>
    );
};

export default TableProjectItems;
