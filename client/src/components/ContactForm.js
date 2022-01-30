import React from "react";

const ContactForm = ({ showContactForm }) => {
  if (!showContactForm) {
    return <div style={{ display: "none" }}></div>;
  }

  return (
    <div className="contactForm">
      <h3>You haven't added anything to your contactForm yet!</h3>
    </div>
  );
};

export default ContactForm;
