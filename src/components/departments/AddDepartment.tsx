import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { map, take, tap } from "rxjs";
import { DepartmentDto } from "../../models/departments/department.model";
import { DepartmentForm } from "../forms/departments/DepartmentForm";
import { departmentService } from "../../services/department.service";
import { useObservable } from '../../utility/hooks/use-observable.hook';

export const AddDepartment = (): JSX.Element => {
  const [initialValue, setInitialValue] = useState<DepartmentDto>({
    id: "",
    name: "",
    faculty: ""
  });

  const departments = useObservable(departmentService.departments$, [] as DepartmentDto[]);

  const navigate = useNavigate();

  const handleDepartmentSubmit = (departmentDto: DepartmentDto) => {
    departmentService.create(departmentDto).pipe(
      map(department => department as DepartmentDto),
      tap(newDepartment => {
        const departmentList = [...departments, newDepartment];
        departmentService.updateDepartments$(departmentList);
      }),
      take(1)
    ).subscribe(dept => navigate("/departments"));
  };

  const backToList = () => {
    navigate("/departments");
  };

  return (
    <DepartmentForm
      initialValue={initialValue}
      backToList={backToList}
      onDepartment={handleDepartmentSubmit}
    />
  );
}
