import Navbar from "./components/UI/navbar/Navbar";
import Footer from "./components/UI/footer/Footer";
import Signup from "./components/UI/signup-login/Signup";
import Login from "./components/UI/signup-login/Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./components/UI/signup-login/ForgotPassword";
import UserProfile from "./components/UI/profile/UserProfile";
import PrivateRoute from "./components/UI/private-route/PrivateRoute";
import UpdateProfile from "./components/UI/profile/UpdateProfile";
import Main from "./components/UI/main/Main";
import NoPage from "./components/UI/no-page/NoPage";
import Fruits from "./components/UI/categories/Fruits";

function App() {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Navbar/>
                    <Routes>
                        <Route path="/profile"
                               element={
                                   <PrivateRoute>
                                       <UserProfile/>
                                   </PrivateRoute>
                               }
                        ></Route>
                        <Route path="/update-profile"
                               element={
                                   <PrivateRoute>
                                       <UpdateProfile/>
                                   </PrivateRoute>
                               }
                        ></Route>
                        <Route path={"/fruits"} element={<Fruits/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>} />
                        <Route path="/" element={<Main/>}/>
                        <Route path="*" element={<NoPage/>}/>
                    </Routes>
                    <Footer/>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
