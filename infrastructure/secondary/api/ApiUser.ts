export class ApiUser {
  constructor(
    public readonly uid: string,
    public readonly email: string,
    public readonly displayName: string,
    public readonly photoURL: string,
  ) {}
}
