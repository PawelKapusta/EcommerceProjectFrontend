// class Auth {
//   constructor() {
//     this.isAuthenticated = false;
//     this.admin = false;
//   }
//
//   login(token) {
//     this.isAuthenticated = true;
//     localStorage.setItem("token", JSON.stringify(token));
//   }
//
//   logout() {
//     this.isAuthenticated = false;
//     localStorage.removeItem("token");
//   }
//
//   checkIsAuthenticated() {
//     // this.authenthicated = localStorage.getItem("token");
//     return this.isAuthenticated !== false;
//   }
// }
//
// export default new Auth();