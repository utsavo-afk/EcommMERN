const authHelper = {
  isAuthenticated() {
    if (localStorage.getItem("auth")) return true;
    return false;
  },
  isAdmin() {
    if (localStorage.getItem("auth")) {
      let auth = JSON.parse(localStorage.getItem("auth"));
      return auth?.user?.isAdmin;
    }
    return false;
  },
  extractAuth() {
    if (localStorage.getItem("auth"))
      return JSON.parse(localStorage.getItem("auth"));
    return false;
  },
};

export default authHelper;
