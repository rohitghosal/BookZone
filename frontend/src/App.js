import React, { useEffect, useState } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

function App() {
  const cart = useSelector(state => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
        <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
          <Link className="brand" to="/">
            BOOKZONE&nbsp;<i className="fas fa-book-open"></i>
          </Link>
        </div>
        <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
        <div>
          <Link to="/cart">
            <b>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
                Cart{cartItems.length > 0 && 
                      (<span className="badge">{cartItems.length}</span>)
                    }
            </b>
          </Link>
          {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                <i className="fas fa-user-circle"></i>
                  &nbsp;<b>{userInfo.name}</b>&nbsp;
                  <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile"><i className="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp;User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">
                    <i className="fa fa-history" aria-hidden="true"></i>&nbsp;Order History
                    </Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                    <i className="fas fa-sign-out-alt"></i>&nbsp;Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin"><b><i className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign In</b></Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                &nbsp;<b>Seller</b>&nbsp;<i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller"><i className="fa fa-suitcase" aria-hidden="true"></i>&nbsp;Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller"><i className="fa fa-tags" aria-hidden="true"></i>&nbsp;Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  <b>Admin</b>&nbsp;<i className="fa fa-check-circle" aria-hidden="true"></i>&nbsp;<i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard"><i className="fa fa-pie-chart" aria-hidden="true"></i>&nbsp;Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist"><i className="fa fa-suitcase" aria-hidden="true"></i>&nbsp;Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist"><i className="fa fa-tags" aria-hidden="true"></i>&nbsp;Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist"><i className="fa fa-users" aria-hidden="true"></i>&nbsp;Users</Link>
                  </li>
                  <li>
                    <Link to="/support"><i className="fa fa-question-circle" aria-hidden="true"></i>&nbsp;Support</Link>
                  </li>
                </ul>
              </div>
            )}
        </div>
      </header>
      <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
      <main>
        <Route path="/seller/:id" component={SellerScreen}></Route>
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
        <Route path="/search/category/:category" component={SearchScreen} exact></Route>
        <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
        <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen} exact></Route>
        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
        <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
        <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
        <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRoute>
        <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
        <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
        <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
        <AdminRoute path="/dashboard" component={DashboardScreen}></AdminRoute>
        <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
        <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
        <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div><b>All right reserved &copy;</b></div>{' '}
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;