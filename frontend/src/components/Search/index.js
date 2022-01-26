import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../store/user";
import "./Search.css";
import { formatInitials, formatName } from "../../helperFuncs";

// Define a function to filter users based on a search query
const filterUsers = (users, query) => {
  if (!query) {
    return users;
  }

  return users.filter((user) => {
    const firstName = user.first_name.toLowerCase();
    const lastName = user.last_name.toLowerCase();
    const email = user.email.toLowerCase();
    const jobTitle = user.job_title.toLowerCase();
    const searchTerm = query.toLowerCase();
    return (
      firstName.includes(searchTerm) ||
      lastName.includes(searchTerm) ||
      email.includes(searchTerm) ||
      jobTitle.includes(searchTerm)
    );
  });
};

const Search = () => {
  const dispatch = useDispatch();

  // Grab all users from state and make into an array
  const users = useSelector((state) => state.users);
  const usersArr = Object.values(users);

  // Search dynamically based on searchQuery state, filtering users based on query
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = filterUsers(usersArr, searchQuery);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      {/* Search input box */}
      <form action="/" method="get" autoComplete="on">
        <label htmlFor="search">
          <span className="hidden">Search users to add them to a project.</span>
        </label>
        <input
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
          type="text"
          id="search"
          name="s"
          placeholder="Search for users"
        />
      </form>
      <div>
        {/* Search results */}
        {/* If there's a query,  */}
        {searchQuery &&
          filteredUsers.map((user) => (
            <div key={user.id} className="user_card_div">
              {user?.icon_url ? (
                <img
                  className="user_circle"
                  src={user?.icon_url}
                  alt="user profile photo"
                />
              ) : (
                <div className="user_circle initials_circle">
                  {formatInitials(user.first_name, user.last_name)}
                </div>
              )}

              <div>
                <p>{formatName(user.first_name, user.last_name)}</p>
                <p>{user.job_title}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Search;
