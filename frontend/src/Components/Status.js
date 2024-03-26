let roleId = localStorage.getItem('roleId') || 0;
let userId = localStorage.getItem('userId') || 0;

export const setLoggedIn = (Id) => {
  roleId = Id;
  localStorage.setItem('roleId', JSON.stringify(roleId));
};

export const setUserId = (Id) => {
  userId = Id;
  localStorage.setItem('userId', userId);
};

export const clearUserStatus = () => {
  roleId = 0;
  userId = 0;
  localStorage.removeItem('roleId');
  localStorage.removeItem('userId');
};

export const getLoggedInStatus = () => {
  return roleId;
};

export const getCurrentUserId = () => {
  return userId;
};