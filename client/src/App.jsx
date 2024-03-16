import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/landingpage/landingPage";
import Nav from "./components/nav/nav.component";
import Home from "./pages/home/home";
import Detail from "./pages/detail/detail";
import CreateDriverForm from "./pages/createDriver/createDriver";
import Error404 from "./pages/error/error";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<CreateDriverForm />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
