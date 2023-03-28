import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./utility/navigation/navigation-bar.util";
import { ChangePassword } from "./components/auth/ChangePassword";
import { EditProfile } from "./components/auth/EditProfile";
import { Login } from "./components/auth/Login";
import { Logout } from "./components/auth/Logout";
import { Signup } from "./components/auth/Signup";
import { ListLibrary } from "./components/libraries/ListLibrary";
import { DetailLibrary } from "./components/libraries/DetailLibrary";
import { DeleteLibrary } from "./components/libraries/DeleteLibrary";
import { EditLibrary } from "./components/libraries/EditLibrary";
import { AddLibrary } from "./components/libraries/AddLibrary";
import { AddAuthor } from "./components/authors/AddAuthor";
import { ListAuthor } from "./components/authors/ListAuthor";
import { DetailAuthor } from "./components/authors/DetailAuthor";
import { DeleteAuthor } from "./components/authors/DeleteAuthor";
import { EditAuthor } from "./components/authors/EditAuthor";
import { ListBook } from "./components/books/ListBook";
import { AddBook } from "./components/books/AddBook";
import { DetailBook } from "./components/books/DetailBook";
import { DeleteBook } from "./components/books/DeleteBook";
import { EditBook } from "./components/books/EditBook";
import { ListBookCat } from "./components/bookCats/ListBookCat";
import { AddBookCat } from "./components/bookCats/AddBookCat";
import { DetailBookCat } from "./components/bookCats/DetailBookCat";
import { DeleteBookCat } from "./components/bookCats/DeleteBookCat";
import { EditBookCat } from "./components/bookCats/EditBookCat";
import { ListDepartment } from "./components/departments/ListDepartment";
import { AddDepartment } from "./components/departments/AddDepartment";
import { DetailDepartment } from "./components/departments/DetailDepartment";
import { DeleteDepartment } from "./components/departments/DeleteDepartment";
import { EditDepartment } from "./components/departments/EditDepartment";
import { Home } from "./components/auth/Home";
import { MustLogin } from './components/auth/MustLogin';
import { NotAllowed } from './components/auth/NotAllowed';
import { authService } from "./services/auth.service";
import { LoginRoute } from "./utility/private-routes/login-route.util";
import { AdminRoute } from './utility/private-routes/admin-route.util';
import { useObservable } from './utility/hooks/use-observable.hook';
import { AuthUser } from './models/auth/auth-user.auth';
import { DeleteUser } from "./components/users/DeleteUser";
import { DetailUser } from './components/users/DetailUser';
import { ListUser } from './components/users/ListUser';

function App() {  
  const authUser = useObservable(authService.authUser$, {} as AuthUser);
  const isLoggedIn = authUser.isLoggedIn!;
  const isAdmin = authUser.isAdmin!;

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <ListLibrary />
            </LoginRoute>
          }
        />
        <Route
          path="/add-library"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <AddLibrary />
            </LoginRoute>
          }
        />
        <Route
          path="/detail-library/:id"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <DetailLibrary />
            </LoginRoute>
          }
        />
        <Route
          path="/delete-library/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DeleteLibrary />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-library/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <EditLibrary />
            </AdminRoute>
          }
        />

        <Route
          path="/authors"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <ListAuthor />
            </LoginRoute>
          }
        />
        <Route
          path="/add-author"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AddAuthor />
            </AdminRoute>
          }
        />
        <Route
          path="/detail-author/:id"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <DetailAuthor />
            </LoginRoute>
          }
        />
        <Route
          path="/delete-author/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DeleteAuthor />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-author/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <EditAuthor />
            </AdminRoute>
          }
        />

        <Route
          path="/books"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <ListBook />
            </LoginRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AddBook />
            </AdminRoute>
          }
        />
        <Route
          path="/detail-book/:id"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <DetailBook />
            </LoginRoute>
          }
        />
        <Route
          path="/delete-book/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DeleteBook />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-book/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <EditBook />
            </AdminRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <ListBookCat />
            </AdminRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AddBookCat />
            </AdminRoute>
          }
        />
        <Route
          path="/detail-category/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DetailBookCat />
            </AdminRoute>
          }
        />
        <Route
          path="/delete-category/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DeleteBookCat />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-category/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <EditBookCat />
            </AdminRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <ListDepartment />
            </LoginRoute>
          }
        />
        <Route
          path="/add-department"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AddDepartment />
            </AdminRoute>
          }
        />
        <Route
          path="/detail-department/:id"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <DetailDepartment />
            </LoginRoute>
          }
        />
        <Route
          path="/delete-department/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <DeleteDepartment />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-department/:id"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <EditDepartment />
            </AdminRoute>
          }
        />

        <Route path="/delete-user/:id" element={
          <AdminRoute isAdmin={isAdmin}>
            <DeleteUser/>
          </AdminRoute>
        }
        />
        <Route path="/detail-user/:id" element={
          <AdminRoute isAdmin={isAdmin}>
            <DetailUser/>
          </AdminRoute>
        }
        />
        <Route path="/users" element={
          <AdminRoute isAdmin={isAdmin}>
            <ListUser/>
          </AdminRoute>
        }
        />
    
        <Route
          path="/change-password"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <ChangePassword />
            </LoginRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
              <EditProfile />
            </LoginRoute>
          }
        />        
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/must-login" element={<MustLogin />} />
        <Route path="/not-allowed" element={<NotAllowed />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
