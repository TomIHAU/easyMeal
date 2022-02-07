import React from "react";

import { BsChevronUp, BsChevronDown } from "react-icons/bs";

export default function SortDirectionComp({ sortDirection, setSortDirection }) {
  function handleSortDirection() {
    setSortDirection(!sortDirection);
  }

  return sortDirection ? (
    <div>
      <div className="showFilterBtn" onClick={handleSortDirection}>
        <BsChevronUp />
      </div>
    </div>
  ) : (
    <div>
      <div className="showFilterBtn" onClick={handleSortDirection}>
        <BsChevronDown />
      </div>
    </div>
  );
}
