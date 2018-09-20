export class User {

  public id: string;
  public userName: string;
  public fullName: string;
  public email: string;
  public jobTitle: string;
  public phoneNumber: string;
  public isEnabled: boolean;
  public isLockedOut: boolean;
  public roles: string[];
  public userInfoId: number;
  public isUserFirstLogin: boolean;

  constructor(id?: string, userName?: string, fullName?: string, email?: string,
    jobTitle?: string, phoneNumber?: string, roles?: string[], userInfoId?: number, isUserFirstLogin?: boolean) {

    this.id = id;
    this.userName = userName;
    this.fullName = fullName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
    this.userInfoId = userInfoId;
    this.isUserFirstLogin = isUserFirstLogin;
  }

  get friendlyName(): string {
    let name = this.fullName || this.userName;

    //if (this.jobTitle)
    //  name = this.jobTitle + ' ' + name;

    return name;
  }
}
