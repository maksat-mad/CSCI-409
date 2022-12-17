// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import Footer from "./components/UI/footer/Footer";
// import Main from "./components/UI/main/Main";
import Register from "./components/UI/register-login/Register";
// import Login from "./components/UI/register-login/Login";

function App() {
    return (
        <div>
            <Navbar/>
            {/*<Main/>*/}
            {/*<BrowserRouter>*/}
            {/*    <Routes>*/}
            {/*        <Route path="/" element={<Layout />}>*/}
            {/*            <Route index element={<Home />} />*/}
            {/*            <Route path="blogs" element={<Blogs />} />*/}
            {/*            <Route path="contact" element={<Contact />} />*/}
            {/*            <Route path="*" element={<NoPage />} />*/}
            {/*        </Route>*/}
            {/*    </Routes>*/}
            {/*</BrowserRouter>*/}
            <Register/>
            {/*<Login/>*/}
            <Footer/>
        </div>
    );
}

export default App;
