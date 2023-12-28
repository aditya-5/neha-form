export class User {
    constructor(
      public firstName: string,
      public lastName: string,
      public username: string,
      public _token?: string,
      public _tokenExpiry?: Date
    ) { }
  
    getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    get token(){
        if (!this._tokenExpiry || new Date() > this._tokenExpiry){
            return null;
        }
        return this._token;
    }
  }
  