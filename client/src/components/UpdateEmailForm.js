import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { EDIT_EMAIL } from "../utils/mutations";

export default function UpdateEmailForm({
  setAddressState,
  setShowShippingForm,
}) {
  const [formState, setFormState] = useState({ email: "" });
  const [addAddress, addAddressRes] = useMutation(EDIT_EMAIL);

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
      const mutationResponse = await addAddress({
        variables: {
          postcode: parseInt(formState.postcode),
          street: formState.street,
          user_id: me.data.id,
        },
      });
      setAddressState(mutationResponse.data.addUserAddress.address);
      setShowShippingForm(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="formCover">
      <form
        className="shippingForm"
        id="shippingFrom"
        onSubmit={handleFormSubmit}
      >
        <h2>Enter Your Address</h2>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          placeholder="Enter your address"
          autoComplete="off"
          name="street"
          value={formState.street}
          onChange={handleFormChange}
        />
        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          placeholder="Enter your postcode"
          autoComplete="off"
          name="postcode"
          value={formState.postcode}
          onChange={handleFormChange}
        />

        <button type="submit" id="btn-sign">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
