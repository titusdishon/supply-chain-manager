import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Registration from "./components/auth/register";
import store from "./redux/store/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
