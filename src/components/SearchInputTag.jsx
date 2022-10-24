import React from "react";

function SearchInputTag({ location }) {
  return (
    <>
      <h2>Input Tag</h2>
      <form>
        <label htmlFor="locName">
          Location
          <input name="locName" value={location.locName} />
        </label>
      </form>
    </>
  );
}

export default SearchInputTag;
