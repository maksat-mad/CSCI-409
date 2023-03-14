import Navbar from "./components/UI/navbar/Navbar";
import Footer from "./components/UI/footer/Footer";
import Signup from "./components/UI/signup-login/Signup";
import Login from "./components/UI/signup-login/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import ForgotPassword from "./components/UI/signup-login/ForgotPassword";
import UserProfile from "./components/UI/profile/UserProfile";
import PrivateRoute from "./components/UI/private-route/PrivateRoute";
import UpdatePassword from "./components/UI/profile/update/UpdatePassword";
import Main from "./components/UI/main/Main";
import NoPage from "./components/UI/no-page/NoPage";
import {Provider} from 'react-redux';
import store from './components/utils/redux/store';
import Category from "./components/UI/category/Category";
import Cart from "./components/UI/cart/Cart";
import Product from "./components/UI/product/Product";
import Buy from "./components/UI/buy/Buy";
import './base-styles/App.css';
import UpdateInfo from "./components/UI/profile/update/UpdateInfo";
import AddProduct from "./components/UI/add-product/AddProduct";
import ProductsSale from "./components/UI/products-sale/ProductsSale";
import ProductsNotSale from "./components/UI/products-not-sale/ProductsNotSale";
import InProgress from "./components/UI/in-progress/InProgress";
import BoughtHistory from "./components/UI/bought-history/BoughtHistory";
import SoldHistory from "./components/UI/sold-history/SoldHistory";
import UpdateProduct from "./components/UI/update-product/UpdateProduct";
import UserManagement from "./components/UI/admin/user-management/UserManagement";
import CreateAdmin from "./components/UI/admin/admin-management/CreateAdmin";
import AdminManagement from "./components/UI/admin/admin-management/AdminManagement";
import AdminRoute from "./components/UI/private-route/AdminRoute";
import SuperAdminRoute from "./components/UI/private-route/SuperAdminRoute";

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
                                           <PrivateRoute>
                                               <AdminRoute>
                                                   <UserManagement/>
                                               </AdminRoute>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/create-admin"
                                       element={
                                           <PrivateRoute>
                                               <SuperAdminRoute>
                                                   <CreateAdmin/>
                                               </SuperAdminRoute>
                                           </PrivateRoute>
                                       }
                                ></Route>
                                <Route path="/admin-management"
                                       element={
                                           <PrivateRoute>
                                               <SuperAdminRoute>
                                                   <AdminManagement/>
                                               </SuperAdminRoute>
                                           </PrivateRoute>
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
