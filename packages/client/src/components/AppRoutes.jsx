import { Navigate, Route, Routes } from "react-router";

import BaseLayout from "@/layouts/Base";
import ShipComponents from "@/pages/ShipComponents";
import Test from "@/pages/Test";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<BaseLayout />}>
      {/* <Route path="ship-components" element={<ShipComponents />} /> */}
      <Route path="test" element={<Test />} />
      <Route index element={<ShipComponents />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
