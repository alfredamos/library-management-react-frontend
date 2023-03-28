import { DeleteItem } from "../../utility/general/delete-item.util";
import { authService } from "../../services/auth.service";
import { Navigate, useNavigate } from "react-router-dom";

export const Logout = () => {
  const authUser = authService.getAuthUser();
  const navigate = useNavigate();

  console.log("In logout, authUser : ", authUser);

 const handleLogout = (value: boolean) => {
   if (value) {
     authService.logout();
     navigate("/home");
   } else {
     navigate("/");
   }
 };   

 return (
  authUser.isLoggedIn ? 
    ( 
      <DeleteItem
      cancelButton="Back"
      deleteItem={handleLogout}
      deleteMessage="Do you really want to logout?"
      deleteTitle="Logout Confirmation!"
      submitButton="Logout"
    />
    ) : 
    (
      <Navigate to="/home" replace />
    )
    
  ); 
};
