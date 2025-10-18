import './App.css'
import UsersListPage from "./pages/users/UsersListPage";
import {Route, Routes} from "react-router";
import UserRegisterPage from "./pages/users/UserRegisterPage";
// import UserLoginPage from "./pages/users/UserLoginPage";
import ForgotPasswordPage from "./pages/users/UserResetPasswordPage/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/users/UserResetPasswordPage/ResetPasswordPage.tsx";
import SuccessPage from "./pages/users/UserResetPasswordPage/SuccessPage.tsx";
import UserLoginPage from "./pages/users/UserLoginPage";
import UserLayout from "./layout/UserLayout";
import NotFoundPage from "./pages/additional/NotFoundPage";


function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<UsersListPage />}/>
                    <Route path={"register"} element={<UserRegisterPage />}/>
                    <Route path={"login"} element={<UserLoginPage />}/>
                    <Route path={"forgot-password"} element={<ForgotPasswordPage />} />
                    <Route path="reset-password/:uid/:token" element={<ResetPasswordPage />} />
                    <Route path={"success-confirm"} element={<SuccessPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>

        </>
    )
}

export default App
