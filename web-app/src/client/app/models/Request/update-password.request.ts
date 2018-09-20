
export class UpdatePasswordRequest {
  newPassword?: string;
  passwordResetToken?: string;

  constructor(newPassword?: string, passwordResetToken?: string) {
    this.newPassword = newPassword;
    this.passwordResetToken = passwordResetToken;
  }
}
