import React from "react";

const Search = () => {
  return (
    <form method="get" action="/">
      <label htmlFor="search" className="hidden">
        Search for people to add to the project.
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search people"
        name="s"
      ></input>
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
