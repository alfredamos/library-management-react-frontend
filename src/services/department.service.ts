import { UpdateDepartmentDto } from "./../models/departments/update-department.model";
import { DepartmentDto } from "../models/departments/department.model";
import { CreateDepartmentDto } from "./../models/departments/create-department.model";
import { DataService } from "./data.service";
import { BehaviorSubject, map, shareReplay, tap } from "rxjs";

type department = CreateDepartmentDto | DepartmentDto | UpdateDepartmentDto;

class DepartmentService extends DataService<department> {
  private departmentsSubject = new BehaviorSubject<DepartmentDto[]>([]);
  departments$ = this.departmentsSubject.asObservable();

  constructor(baseUrl: string) {
    super(baseUrl);
    this.loadDepartments();
  }

  private loadDepartments() {
    this.findAll()
      .pipe(
        map((departments) => departments as DepartmentDto[]),
        tap((departments) => this.updateDepartments$(departments)),
        //shareReplay(1)
      )
      .subscribe();
  }

  updateDepartments$(value: DepartmentDto[]): void {
    this.departmentsSubject.next(value);
  }

  getDepartments(): DepartmentDto[] {
    return this.departmentsSubject.getValue();
  }
}
const departmentsUrl = import.meta.env.VITE_DEPARTMENTS_URL as string;

export const departmentService = new DepartmentService(departmentsUrl);
