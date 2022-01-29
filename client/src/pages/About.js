import React, { useState } from "react";

export default function About() {
  const [showContactForm, setShowContactForm] = useState(false);
  const handleShowContactForm = () => {
    setShowContactForm(!showContactForm);
    console.log(showContactForm);
  };
  return (
    <div className="About">
      <div className="aboutDiv aboutMain">
        <img src="/img/foodTable.jpg"></img>
        <div className="aboutText">
          <p>
            At EasyMeal we don't do boring, mass-produced and bland food. We are
            a restaurant style, Lorem Ipsum service that is always offering you
            something new and exciting - and delivering it right to your
            doorstep!
          </p>
          <p>
            We are here to help you become the healthiest version of Lorem
            Ipsum, all while lightening your environmental footprint.
          </p>
          <p>
            Delivering meals with a conscience, we are here to guide and inspire
            you on your journey - because it isn't a diet - it's a lifestyle.
          </p>
          <h3 className="aboutContact" onClick={handleShowContactForm}>
            Any Questions Contact us
          </h3>
        </div>
      </div>
      <div className="aboutDiv aboutFacts">
        <div className="aboutText">
          <h3>Locally Sourced Ingredients.</h3>
          <p>
            We pride ourselves on sourcing ethical and sustainable ingredients
            to deliver the best tasting meals. Our meals include: Grass fed beef
            and lamb, Australian sourced seasonal vegetables and sustainable
            Tasmanian Lorem and sustainable Ipsum from New Zealand.
          </p>
          <p>
            Our ever-growing, innovative menu makes living the life easy, and an
            experience you will want to soak up.
          </p>
        </div>
        <img src="/img/foodTable.jpg"></img>
      </div>
      <div className="aboutDiv aboutFacts">
        <img src="/img/foodTable.jpg"></img>
        <div className="aboutText">
          <h3>Fuelling Aussies Across Australia.</h3>
          <p>
            Our meals are made fresh to order and cooked by real chefs at our
            Lorem Ipsum certified facility. Meals are then packaged up and
            delivered fresh to your door to over 4,500 postcodes across
            Australia, 7 days a week.
          </p>
        </div>
      </div>
    </div>
  );
}
