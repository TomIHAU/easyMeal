import React from "react";
import { AiOutlineClose } from "react-icons/ai";
const AboutForm = ({
  handleShowContactForm,
  handleFormChange,
  contactForm,
  handleFormSubmit,
}) => {
  console.log(contactForm);
  return (
    <form id="contactForm" onSubmit={handleFormSubmit}>
      <div id="aboutClose" onClick={handleShowContactForm}>
        <AiOutlineClose />
      </div>
      <h3>Contact Us</h3>
      <label for="nameInput">Name:</label>
      <input
        className="aboutInput"
        id="nameInput"
        type="text"
        name="name"
        value={contactForm.name}
        onChange={handleFormChange}
      ></input>
      <label for="emailInput">Email Address:</label>
      <input
        className="aboutInput"
        id="emailInput"
        type="email"
        name="email"
        value={contactForm.email}
        onChange={handleFormChange}
      ></input>
      <label for="messageInput">Message:</label>
      <textarea
        className="aboutInput"
        id="messageInput"
        type="textarea"
        name="text"
        value={contactForm.text}
        onChange={handleFormChange}
      ></textarea>
      <button className="mainBannerBtn" type="submit">
        Send
      </button>
    </form>
  );
};

export default AboutForm;
