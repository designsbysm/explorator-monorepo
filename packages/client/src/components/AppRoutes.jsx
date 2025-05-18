import { Navigate, Route, Routes } from "react-router";

import BaseLayout from "@/layouts/Base";
import ShipComponents from "@/pages/ShipComponents";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<BaseLayout />}>
      {/* <Route path="ship-components" element={<ShipComponents />} /> */}
      <Route index element={<ShipComponents />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
