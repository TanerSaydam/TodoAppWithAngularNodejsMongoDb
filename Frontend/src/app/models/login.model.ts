import { UserModel } from "./user.model";

export class LoginModel{
    token: string = "";
    user: UserModel = new UserModel();
}