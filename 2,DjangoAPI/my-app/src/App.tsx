import './App.css'
import UsersListPage from "./pages/users/UsersListPage";
import {Route, Routes} from "react-router";
import UserRegisterPage from "./pages/users/UserRegisterPage";
// import UserLoginPage from "./pages/users/UserLoginPage";
import ForgotPasswordPage from "./pages/users/UserResetPasswordPage/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/users/UserResetPasswordPage/ResetPasswordPage.tsx";
import SuccessPage from "./pages/users/UserResetPasswordPage/SuccessPage.tsx";
import UserLoginPage from "./pages/users/UserLoginPage";


function App() {

    return (
        <>
            <Routes>
                <Route path="/" >
                    <Route index element={<UsersListPage />}/>
                    <Route path={"register"} element={<UserRegisterPage />}/>
                    <Route path={"login"} element={<UserLoginPage />}/>
                    <Route path={"forgot-password"} element={<ForgotPasswordPage />} />
                    <Route path="reset-password/:uid/:token" element={<ResetPasswordPage />} />
                    <Route path={"success-confirm"} element={<SuccessPage />} />
                </Route>
            </Routes>

        </>
    )
}

export default App
