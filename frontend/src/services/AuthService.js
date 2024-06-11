import ApiService from "./ApiService";

export default class AuthService {
  static login = (loginInfo) => ApiService.post("/login", loginInfo);

  static userInfo = () => ApiService.get("/user-info");
}
