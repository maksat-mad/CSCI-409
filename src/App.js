// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import Footer from "./components/UI/footer/Footer";
import Main from "./components/UI/main/Main";

function App() {
    return (
        <div>
            <Navbar/>
            <Main/>
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
            <Footer/>
        </div>
    );
}

export default App;
