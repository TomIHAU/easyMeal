import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { EDIT_EMAIL } from "../utils/mutations";

export default function UpdateEmailForm({ setEmail, setShowUpdateForm }) {
  const [formState, setFormState] = useState({ email: "" });
  const [addEmail, addEmailRes] = useMutation(EDIT_EMAIL);

  const me = Auth.getProfile();
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState.email, me.data.id);
    try {
      const mutationResponse = await addEmail({
        variables: {
          email: formState.email,
          user_id: me.data.id,
        },
      });
      setEmail(mutationResponse.data.editEmail.email);
      setShowUpdateForm(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="formCover">
      <form
        className="shippingFrom EmailForm"
        id="EmailForm"
        onSubmit={handleFormSubmit}
      >
        <h2>Enter Your New Email</h2>
        <label htmlFor="street">Email</label>
        <input
          type="email"
          placeholder="Enter your new email"
          autoComplete="off"
          name="email"
          value={formState.email}
          onChange={handleFormChange}
        />

        <button type="submit" id="btn-sign">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
