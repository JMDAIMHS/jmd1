import React from "react";
// import "../App.css";
import { MdClose } from "react-icons/md";

const Form = ({ handleSubmit, handleOnChange, handlClose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handlClose}>
          <MdClose />
        </div>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
        />

        <label htmlFor="name">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
        />

        <label htmlFor="name">Mobile :</label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
        />

        <button className="btn1">Submit</button>
      </form>
    </div>
  );
};

export default Form;
