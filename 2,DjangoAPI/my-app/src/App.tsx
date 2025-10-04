import './App.css'
import UsersListPage from "./pages/users/UsersListPage";
import {Route, Routes} from "react-router";
import UserRegisterPage from "./pages/users/UserRegisterPage";


function App() {

    return (
        <>
            <Routes>
                <Route path="/" >
                    <Route index element={<UsersListPage />}/>
                    <Route path={"register"} element={<UserRegisterPage />}/>
                </Route>
            </Routes>

        </>
    )
}

export default App
