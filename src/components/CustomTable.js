import React, { useState } from "react";

export default function CustomTable({
  columns,
  tabledata,
  globalSearch,
  globalEditable,
  rowEditable,
}) {
  const originalData = tabledata;
  const [tableData, setTableData] = useState(tabledata);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [editedText, setEditedText] = useState("")
  // const [edit, setEdit] = useState(false);
  const [rowEditId, setRowEditId] = useState("");

  // Below method is for searching data from all columns using keys
  const searchGlobalData = (filterText) => {
    setTableData(
      originalData.filter((user) =>
        columns.some((column) =>
          user[column.accessor]
            .toLowerCase()
            .includes(filterText.target.value.toLowerCase())
        )
      )
    );
  };

  //   Below methos is used for searching data column vise
  const searchDataInColumn = (searchField, filterText) => {
    setTableData(
      originalData.filter((user) =>
        user[searchField]
          .toLowerCase()
          .includes(filterText.target.value.toLowerCase())
      )
    );
  };

  // Below method is for sorting table's data
  const sortData = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      console.log("sorted : ", sorted);
      setTableData(sorted);
    }
  };

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    sortData(accessor, sortOrder);
  };

  let temp = []
  // let a = ""
  const handleTextEdit = (row, column, text) => {
    // console.log(e.target.value)
    // console.log(originalData.filter((user) => user[accessor].toLowerCase().includes(e.target.value.toLowerCase())))
    // row[column] = e.target.value;
    // console.log(row[column]);
    //--------------------
    // a = e.target.value;
    console.log("text : ",text)
    temp[row.id] = {column : column, row : row.id, data : text}
    console.log("start temp : ", temp)
    // setEditedText("")
  };

  const handleRowEdit = (item) => {
    console.log("items : ", item);
    console.log("columns : ", columns);
    // setEdit(true);
    setRowEditId(item.id);
  };

  const handleCancle = () => {
    // setEdit(false)
    setRowEditId("")
  console.log("temp is : ",temp)

  }

  const handleSave = () => {

  }

  return (
    <div className="container">
      {globalSearch ? (
        <input
          type="text"
          placeholder="Search..."
          className="search"
          onChange={searchGlobalData}
        />
      ) : (
        ""
      )}

      <div className="wrapper">
        <table className="table">
          <tbody>
            <tr>
              {rowEditable ? <th className="for-svg"></th> : ""}
              {columns.map((column) => {
                const icons = column.sortable
                  ? sortField === column.accessor && order === "asc"
                    ? "up"
                    : sortField === column.accessor && order === "desc"
                    ? "down"
                    : "default"
                  : "";
                return (
                  <th
                    key={column.accessor}
                    onClick={
                      column.sortable
                        ? () => handleSortingChange(column.accessor)
                        : null
                    }
                    className={icons}
                  >
                    {column.label}
                  </th>
                );
              })}
            </tr>

            {/* Below is for search individual column */}
            <tr>
              {rowEditable ? <th></th> : ""}
              {columns.map((column) =>
                column.searchable ? (
                  <th key={column.accessor}>
                    <input
                      placeholder="Filter..."
                      type="text"
                      onChange={(e) => searchDataInColumn(column.accessor, e)}
                      className="filter"
                    />
                  </th>
                ) : (
                  <th key={column.accessor}></th>
                )
              )}
            </tr>

            {/* below is for table data */}
            {tableData.map((item) => (
              <tr key={item.id}>
                {rowEditable && (
                  <td>
                    { rowEditId === item.id ? (
                      <div>
                        <svg
                          id="check-icon"
                          onClick={handleSave}
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "20px", height: "20px" }}
                          viewBox="0 0 448 512"
                        >
                          <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                        </svg>

                        <svg
                          id="cross-icon"
                          onClick={handleCancle}
                          style={{ width: "20px", height: "20px" }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                        </svg>
                      </div>
                    ) : (
                      <svg
                        id="edit-icon"
                        onClick={() => handleRowEdit(item)}
                        style={{ width: "20px", height: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z" />
                      </svg>
                    )}
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.accessor}>
                    {globalEditable || rowEditId === item.id ? (
                      <form>
                        <input
                          type={column.type ? column.type : "text"}
                          // placeholder={item[column.accessor]}
                          value={editedText===""?item[column.accessor]:""}
                          onChange={e => setEditedText(e.target.value)}
                          onBlur={() =>
                            handleTextEdit(item, column.accessor, editedText)
                          }
                        />
                      </form>
                    ) : (
                      item[column.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
