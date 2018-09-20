export class UserLogin {

  username: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;

  constructor(username?: string, password?: string, rememberMe?: boolean) {
    this.username = username;
    this.password = password;
    this.rememberMe = rememberMe;
  }
}
