import { useParams, useNavigate } from "react-router-dom";
import { map, take, tap } from "rxjs";
import { DepartmentDto } from "../../models/departments/department.model";
import { departmentService } from "../../services/department.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { DepartmentForm } from "../forms/departments/DepartmentForm";
import { useFindResource } from "../../utility/hooks/use-resource.hook";

export const EditDepartment = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const departments = useObservable(
    departmentService.departments$,
    [] as DepartmentDto[]
  );

  const { resource: department, isLoading } = useFindResource<DepartmentDto>(
    departments,
    id!
  );

  const handleDepartmentSubmit = (departmentDto: DepartmentDto) => {
    departmentService
      .edit(departmentDto)
      .pipe(
        map((departmentL) => departmentL as DepartmentDto),
        tap((editedDepartment) => {
          const updatedDepartments = departments.map(department => department.id === editedDepartment.id ? editedDepartment : department);
          
          departmentService.updateDepartments$(updatedDepartments); 
        }),
        take(1)
      )
      .subscribe((dept) => navigate("/departments"));
  };

  const backToList = () => {
    navigate("/departments");
  };

  return (
    <>
      {!isLoading && department && (
        <DepartmentForm
          initialValue={department}
          backToList={backToList}
          onDepartment={handleDepartmentSubmit}
        />
      )}
    </>
  );
};
