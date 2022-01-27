import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../store/user";
import "./Search.css";
import { formatInitials, formatName, filterUsers } from "../../helperFuncs";
import {
  getProjAssignments,
  createProjAssignment,
} from "../../store/projectAssignment";

const Search = ({ projectId }) => {
  const dispatch = useDispatch();

  // Grab all users from state and make into an array
  const users = useSelector((state) => state.users);
  const usersArr = Object.values(users);

  // Search dynamically based on searchQuery state, filtering users based on query
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = filterUsers(usersArr, searchQuery);

  // const [userToAdd, setUserToAdd] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleAddUser = (e, userId) => {
    e.preventDefault();
    const projAssignment = { userId, projectId };
    dispatch(createProjAssignment(projAssignment));
    dispatch(getProjAssignments(projectId));
  };

  return (
    <section className="display_users">
      <h2 className="light_large">Search for people to add</h2>
      {/* Search input box */}
      <form action="/" method="get" autoComplete="on">
        <label htmlFor="search">
          <span className="hidden">Search for users to add to a project.</span>
        </label>

        <i className="fas fa-search-plus"></i>
        <input
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
          type="text"
          id="search"
          name="s"
          placeholder="Search by name, email, or job title"
        />
      </form>
      <div>
        {/* Search results */}
        {/* If there's a query,  */}
        {
          filteredUsers.map((user) => (
            <div key={user.id} className="user_card_div">
              <span>
                {user?.icon_url ? (
                  <img
                    className="user_circle"
                    src={user?.icon_url}
                    alt="User profile icon"
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
              </span>
              <button onClick={(e) => handleAddUser(e, user?.id)}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Search;
