import { ChangePasswordDto } from "../models/auth/change-password.auth";
import { EditProfileDto } from "../models/auth/edit-profile.auth";
import { LoginDto } from "../models/auth/login.auth";
import { SignupDto } from "../models/auth/signup.auth";
import { BehaviorSubject, Observable, from, map } from "rxjs";
import { AuthUser } from "../models/auth/auth-user.auth";
import { UserType } from "../enum/user-type.enum";
import Axios from "../interceptors/axios.interceptor";
import { CurrentUserDto } from "../models/auth/current-user.auth";

type Auth = ChangePasswordDto | EditProfileDto | LoginDto | SignupDto;

class AuthService {
  private authUserSubject = new BehaviorSubject(this.initialUser());
  authUser$ = this.authUserSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<CurrentUserDto>(
    {} as CurrentUserDto
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(public baseUrl: string) {}

  getAuthUser(): AuthUser {
    return this.authUserSubject.getValue();
  }

  updateAuthUser$(value: AuthUser) {
    this.authUserSubject.next(value);
    this.currentUserSubject.next(value.user!);
  }

  createAuth(url: string, authDto: Auth): Observable<AuthUser> {
    const resource = from(
      Axios.post<AuthUser>(`${this.baseUrl}/${url}`, authDto)
    );
    return resource.pipe(
      map((resp: { data: any }) => resp.data)
    ) as Observable<AuthUser>;
  }

  updateAuth(url: string, authDto: Auth): Observable<AuthUser> {
    const resource = from(
      Axios.patch<AuthUser>(`${this.baseUrl}/${url}`, authDto)
    );
    return resource.pipe(
      map((resp: { data: any }) => resp.data)
    ) as Observable<AuthUser>;
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string {
    return localStorage.getItem("token")!;
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  login(value: AuthUser) {
    this.updateAuthUser$(value);
    this.setToken(value.token!);
  }

  logout() {
    this.updateAuthUser$(this.initialUser());
    this.removeToken();
    window.location.reload();
  }

  initialUser(): AuthUser {
    return {
      id: "",
      name: "",
      userType: UserType.Student,
      token: "",
      message: "You are not logged-in",
      isLoggedIn: false,
      isAdmin: false,
    };
  }
}

const authUrl = import.meta.env.VITE_AUTH_URL;

export const authService = new AuthService(authUrl);
