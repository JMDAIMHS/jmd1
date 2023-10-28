import axios from "axios";
import "../App.css";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

// axios.defaults.baseURL = "http://localhost:8080/";
const TableData = () => {
  const [search, setSearch] = useState("");
  const [data1, setData1] = useState([]);
  const [fiterData1, setFilterData1] = useState([]);

  const getData1 = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      // const response = await axios.get(" http://localhost:8080/");

      setData1(response.data);
      setFilterData1(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = () => {
    // setFormDataEdit(el);
    // setEditSection(true);
  };

  const colums = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      // selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.nativeName,
      // selector: (row) => row.email,
    },
    {
      name: "Mobile",
      selector: (row) => row.capital,
      // selector: (row) => row.mobile,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button className="btn1 btn-edit" onClick={() => handleEdit()}>
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button className="btn1 btn-delete" onClick={() => handleEdit()}>
          Delete
        </button>
      ),
    },
  ];
  // console.log(data1);
  useEffect(() => {
    getData1();
  }, []);
  console.log("countryrrr", data1);
  useEffect(() => {
    const result = data1.filter((el) => {
      return el.name.toLowerCase().match(search.toLowerCase());
    });
    setFilterData1(result);
  }, [search]);
  return (
    <DataTable
      title={"Pagination Table/Data From Other API"}
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      columns={colums}
      data={fiterData1}
      pagination
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here"
          className="w-25 form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    />
  );
};

export default TableData;
