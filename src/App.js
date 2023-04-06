import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Signup from "./pages/signup-login/Signup";
import Login from "./pages/signup-login/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import ForgotPassword from "./pages/signup-login/ForgotPassword";
import UserProfile from "./pages/profile/UserProfile";
import PrivateRoute from "./context/private-route/PrivateRoute";
import UpdatePassword from "./pages/profile/update/UpdatePassword";
import Main from "./pages/main/Main";
import NoPage from "./pages/no-page/NoPage";
import {Provider} from 'react-redux';
import store from './utils/redux/store';
import Category from "./pages/category/Category";
import Cart from "./pages/cart/Cart";
import Product from "./pages/product/Product";
import Buy from "./pages/buy/Buy";
import './base-styles/App.css';
import UpdateInfo from "./pages/profile/update/UpdateInfo";
import AddProduct from "./pages/add-product/AddProduct";
import ProductsSale from "./pages/products-sale/ProductsSale";
import ProductsNotSale from "./pages/products-not-sale/ProductsNotSale";
import InProgress from "./pages/in-progress/InProgress";
import BoughtHistory from "./pages/bought-history/BoughtHistory";
import SoldHistory from "./pages/sold-history/SoldHistory";
import UpdateProduct from "./pages/update-product/UpdateProduct";
import UserManagement from "./pages/admin/user-management/UserManagement";
import CreateAdmin from "./pages/admin/admin-management/CreateAdmin";
import AdminManagement from "./pages/admin/admin-management/AdminManagement";
import AdminRoute from "./context/private-route/AdminRoute";
import SuperAdminRoute from "./context/private-route/SuperAdminRoute";

function App() {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Provider store={store}>
                        <div className={"my-body"}>
                            <Navbar/>
                            <Routes>
                                <Route path="/profile"
                                       element={
                                           <PrivateRoute>
                                               <UserProfile/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/update-password"
                                       element={
                                           <PrivateRoute>
                                               <UpdatePassword/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/update-info"
                                       element={
                                           <PrivateRoute>
                                               <UpdateInfo/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/buy"
                                       element={
                                           <PrivateRoute>
                                               <Buy/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/products/:productId" element={<Product/>}/>
                                <Route path="/category" element={<Category/>}/>
                                <Route path="/cart" element={<Cart/>}/>
                                <Route path="/signup" element={<Signup/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                                <Route path="/" element={<Main/>}/>
                                <Route path="*" element={<NoPage/>}/>
                                <Route path="/add-product"
                                       element={
                                           <PrivateRoute>
                                               <AddProduct/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/products-sale"
                                       element={
                                           <PrivateRoute>
                                               <ProductsSale/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/products-not-sale"
                                       element={
                                           <PrivateRoute>
                                               <ProductsNotSale/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/in-progress"
                                       element={
                                           <PrivateRoute>
                                               <InProgress/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/bought-history"
                                       element={
                                           <PrivateRoute>
                                               <BoughtHistory/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/sold-history"
                                       element={
                                           <PrivateRoute>
                                               <SoldHistory/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/update-product"
                                       element={
                                           <PrivateRoute>
                                               <UpdateProduct/>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/user-management"
                                       element={
                                           <AdminRoute>
                                               <UserManagement/>
                                           </AdminRoute>
                                       }
                                ></Route>
                                <Route path="/create-admin"
                                       element={
                                           <SuperAdminRoute>
                                               <CreateAdmin/>
                                           </SuperAdminRoute>
                                       }
                                ></Route>
                                <Route path="/admin-management"
                                       element={
                                           <SuperAdminRoute>
                                               <AdminManagement/>
                                           </SuperAdminRoute>
                                       }
                                ></Route>
                            </Routes>
                        </div>
                        <Footer/>
                    </Provider>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
