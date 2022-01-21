// Given a first and last name, format it with just the initials
export const formatInitials = (firstName, lastName) => {
  return `${firstName[0]}${lastName[0]}`;
};

export const formatName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};
