import { useState } from "react";
import "./App.css";
import CustomTable from "./components/CustomTable";
import { mockdata } from "./MOCK_DATA";


function App() {

  const [temp, setTemp] = useState(false)
  const toggleMe = () => {
    temp?setTemp(false):setTemp(true)
  }



  // Notes :-- use below keywords to activate features for your column
  // sortable
  // searchable
  // type

  const columns = [
    { label: "Full Name", accessor: "first_name", sortable: true, searchable: true },
    { label: "Last Name", accessor: "last_name", sortable: true, searchable: true },
    { label: "Email", accessor: "email", sortable: false, searchable: false, type:"email" },
    { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
    // { label: "Phone", accessor: "phone", sortable: true, searchable: true, type:"number" },
  ];

  // Notes :-- use below keywords to activate funtionalities in my custom table
  // globalSearch
  // globalEditable
  // rowEditable

  return (
    <div className="app">
      <button onClick={toggleMe} >Editable table toggle</button>
      {
        temp ?
      <CustomTable tabledata={mockdata} globalSearch rowEditable columns={columns} />
      :
      <CustomTable tabledata={mockdata} globalSearch columns={columns} />
      }
    </div>
  );
}

export default App;
