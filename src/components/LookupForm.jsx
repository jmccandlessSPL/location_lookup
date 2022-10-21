import React, { useEffect, useState } from "react";

function LookupForm() {
  const [location, setLocation] = useState("");
  const baseURL = "https://api.mdm.sandbox.suresuiteapps.com/v1/locations/";
  useEffect(() => {}, []);

  function handleChange(e) {
    e.preventDefault();
    setLocation(e.target.value);
  }

  return (
    <>
      <div>
        form for search
        <form>
          <label>
            Search for...
            <input
              name="location"
              type="text"
              value={location}
              onChange={handleChange}
            />
          </label>
        </form>
      </div>
    </>
  );
}

export default LookupForm;
