import Auth from "pages/Auth";
import DetailJob from "pages/DetailJob";
import Home from "pages/Home";
import { Route, Routes } from "react-router-dom";
function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<DetailJob />} />
    </Routes>
  );
}

export default MainRoute;
