import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_ADDRESS } from "../utils/mutations";
export default function ShippingForm({ setAddressState, setShowShippingForm }) {
  const [formState, setFormState] = useState({ postcode: 0, street: "" });
  const [addAddress, addAddressRes] = useMutation(ADD_ADDRESS);
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
    console.log(formState.postcode, formState.street, me.data.id);
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
    <form
      className="shippingFrom"
      id="shippingFrom"
      onSubmit={handleFormSubmit}
    >
      <h2>Enter Your Address</h2>
      <input
        type="street"
        placeholder="Enter your address"
        autoComplete="off"
        name="street"
        value={formState.street}
        onChange={handleFormChange}
      />
      <input
        type="postcode"
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
  );
}
