import React from "react";
import { AiOutlineClose } from "react-icons/ai";
const ContactForm = ({ handleShowContactForm }) => {
  return (
    <form id="contactForm">
      <AiOutlineClose id="" onClick={handleShowContactForm} />{" "}
      <h3>Contact Us</h3>
      <label for="nameInput">Name:</label>
      <input id="nameInput" type="text" name="name"></input>
      <label for="emailInput">Email Address:</label>
      <input id="emailInput" type="email" name="email"></input>
      <label for="messageInput">Message:</label>
      <textarea id="messageInput" type="textarea"></textarea>
      <button className="mainBannerBtn" type="submit">
        Send
      </button>
    </form>
  );
};

export default ContactForm;
