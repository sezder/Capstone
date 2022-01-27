export const formatInitials = (firstName, lastName) => {
  return `${firstName[0]}${lastName[0]}`;
};

export const formatName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

// Define a function to filter users based on a search query
export const filterUsers = (users, query) => {
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

// Filter assignments of projects
export const filterAssignments = (projectId, assignmentsObj) => {
  const userIdsArr = [];
  for (let key in assignmentsObj) {
    let value = assignmentsObj[key];
    if (value.project_id === projectId) {
      userIdsArr.push(value.user_id);
    }
  }
  return userIdsArr;
};
