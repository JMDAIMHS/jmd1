import "../App.css";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Form from "./Form";

axios.defaults.baseURL = "http://localhost:8080/";

const Main = () => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        name: "",
        email: "",
        mobile: "",
      });
    }
  };
  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };
  return (
    <>
      <div className="container1">
        <button className="btn1 btn-add" onClick={() => setAddSection(true)}>
          ADD
        </button>

        {addSection && (
          <Form
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handlClose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <Form
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handlClose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="tableContainer">
          <table id="myTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button
                          className="btn1 btn-edit"
                          onClick={() => handleEdit(el)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn1 btn-delete"
                          onClick={() => handleDelete(el._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p style={{ textAlign: "center" }}>No data available</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Main;
