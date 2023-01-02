import Auth from "pages/Auth";
import DetailJob from "pages/DetailJob";
import Home from "pages/Home";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
function MainRoute() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<DetailJob />} />
    </Routes>
  );
}

export default MainRoute;
