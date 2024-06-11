import ApiService from "./ApiService";

export default class UserService {
  static createUser = async (user) => ApiService.post("/registration", user);
}
