import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./utils/protected-routes";
import PageWrapper from "./components/dashboard/pages/page-wrapper";
const Login = lazy(() => import("./components/auth/login"));
const CreateOrUpdateUser = lazy(
  () => import("./components/auth/create-or-update-user")
);
const Home = lazy(() => import("./components/dashboard/home"));
const Orders = lazy(() => import("./components/dashboard/pages/orders"));
const Products = lazy(() => import("./components/dashboard/pages/products"));
const Inventory = lazy(() => import("./components/dashboard/pages/inventory"));
const Users = lazy(() => import("./components/dashboard/pages/users"));
const CreateOrUpdateProduct = lazy(
  () => import("./components/dashboard/pages/create-update-product")
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
              <Suspense
                fallback={
                  <PageWrapper>
                    <div>Loading...</div>
                  </PageWrapper>
                }
              >
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/orders"
            element={
              <Suspense
                fallback={
                  <PageWrapper>
                    <div>Loading...</div>
                  </PageWrapper>
                }
              >
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/products"
            element={
              <Suspense
                fallback={
                  <PageWrapper>
                    <div>Loading...</div>
                  </PageWrapper>
                }
              >
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/create-products/:id?"
            element={
              <Suspense
                fallback={
                  <PageWrapper>
                    <div>Loading...</div>
                  </PageWrapper>
                }
              >
                <ProtectedRoute>
                  <CreateOrUpdateProduct />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/inventory"
            element={
              <Suspense
                fallback={
                  <PageWrapper>
                    <div>Loading...</div>
                  </PageWrapper>
                }
              >
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/home/users"
            element={
              <Suspense
                fallback={
                  <PageWrapper>
                    <div>Loading...</div>
                  </PageWrapper>
                }
              >
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/users/create-or-update/:id?"
            element={
              <Suspense
                fallback={
                  <PageWrapper>
                    <div>Loading...</div>
                  </PageWrapper>
                }
              >
                <ProtectedRoute>
                  <CreateOrUpdateUser />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/order/checkout"
            element={
              <Suspense
                fallback={
                  <PageWrapper>
                    <div>Loading...</div>
                  </PageWrapper>
                }
              >
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
