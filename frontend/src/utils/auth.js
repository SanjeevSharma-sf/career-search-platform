import { useSelector } from "react-redux";

export const isTokenValid = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  if (user) {
    const { exp } = parseJwt(user?.accessToken);
    if (exp * 1000 > Date.now()) {
      // token is not expired
      return true;
    }
  }
  localStorage.setItem("user", null);
  return false;
};

export default class Auth {
  static authenticate = () => isTokenValid();

  static allowed = ({ callback }) => (callback === null ? true : callback());

  //   static isTgAdmin = () => useSelector((state) => state.auth.tgAdmin);
}
