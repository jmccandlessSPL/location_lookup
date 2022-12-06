import React from "react";

function SearchInputTag({ location }) {
  function handleChange(e) {
    e.preventDefault();
  }

  return (
    <>
      <h2>Input Tag</h2>
      <form>
        <label htmlFor="locName">
          Location
          <input
            name="locName"
            value={location ? location.locName : ""}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </form>
    </>
  );
}

export default SearchInputTag;
