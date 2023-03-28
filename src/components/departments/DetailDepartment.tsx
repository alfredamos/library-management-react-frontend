import { useParams, Link, useNavigate } from "react-router-dom";
import { DepartmentDto } from "../../models/departments/department.model";
import { departmentService } from "../../services/department.service";
import { useObservable } from "../../utility/hooks/use-observable.hook";
import { useFindResource } from "../../utility/hooks/use-resource.hook";
import { useState } from "react";
import { map, tap, take } from "rxjs";
import { DeleteItem } from "../../utility/general/delete-item.util";
import { SingleDisplay } from "./SingleDisplay";

export const DetailDepartment = (): JSX.Element => {
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");

  const departments = useObservable(
    departmentService.departments$,
    [] as DepartmentDto[]
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const { resource: department, isLoading } = useFindResource(departments, id!);

  const deleteClick = () => {
    setShowDeleteItem(!showDeleteItem);
    setConfirmationTitle("Department Delete Confirmation!");
    setConfirmationMessage(
      `Do you want to delete department : ${department.name} ?`
    );
  };

  const handleDelete = (value: boolean) => {
    if (value) {
      departmentService
        .remove(id!)
        .pipe(
          map((depart) => depart as DepartmentDto),
          tap((removedDepartment) => {
            const filteredDepartment = departments.filter(
              (department) => department.id !== removedDepartment.id
            );
            departmentService.updateDepartments$(filteredDepartment);
            navigate("/departments");
          }),
          take(1)
        )
        .subscribe();
    } else {
      navigate("/departments");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-department/${id}`);
  };

  const handleBackToList = () => {
    navigate("/departments");
  };

  return (
    <>
      {showDeleteItem ? (
        <DeleteItem
          submitButton="Delete"
          cancelButton="Back"
          deleteTitle={confirmationTitle}
          deleteMessage={confirmationMessage}
          deleteItem={handleDelete}
        />
      ) : (
        !isLoading &&
        department && (
          <SingleDisplay
            department={department}
            onBackToList={handleBackToList}
            onDelete={deleteClick}
            onEdit={handleEdit}
          />
        )
      )}
    </>
  );
}
