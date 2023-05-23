import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./utils/protected-routes";
const Login = lazy(() => import("./components/auth/login"));
const Registration = lazy(() => import("./components/auth/register"));
const Home = lazy(() => import("./components/dashboard/home"));
const Orders = lazy(() => import("./components/dashboard/pages/orders"));
const Products = lazy(() => import("./components/dashboard/pages/products"));
const Inventory = lazy(() => import("./components/dashboard/pages/inventory"));
const Users = lazy(() => import("./components/dashboard/pages/users"));
const CreateProduct = lazy(
  () => import("./components/dashboard/pages/create-product")
);
const Checkout = lazy(() => import("./components/dashboard/pages/checkout"));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/home"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/orders"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/products"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/create-products"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/inventory"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/users"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/users/register"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute>
                  <Registration />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/order/checkout"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
