import { DataService} from "./data.service";
import { UserDto } from "../models/users/user.model";
import { BehaviorSubject, map, tap } from "rxjs";

class UserService extends DataService<UserDto> {
  private usersSubject = new BehaviorSubject<UserDto[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(public baseUrl: string) {
    super(baseUrl);
    this.loadUsers();
  }

  private loadUsers() {
    this.findAll()
      .pipe(
        map((users) => users as UserDto[]),
        tap((users) => this.updateUsers$(users))
      )
      .subscribe();
  }

  updateUsers$(value: UserDto[]) {
    this.usersSubject.next(value);
  }

  getUsers() {
    return this.usersSubject.getValue();
  }
}

const userUrl = import.meta.env.VITE_USERS_URL;

export const userService = new UserService(userUrl);
