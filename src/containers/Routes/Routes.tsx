import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes.constants";

export const AppRoutes = () => {
  const Main = lazy(() => import("../../pages/Main"));
  const Targets = lazy(() => import("../../pages/Targets"));
  const Comunity = lazy(() => import("../../pages/Comunity"));
  const Practics = lazy(() => import("../../pages/Practics"));

  return (
    <Suspense fallback={<div>fallback</div>}>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.TARGETS} element={<Targets />} />
        <Route path={ROUTES.COMUNITY} element={<Comunity />} />
        <Route path={ROUTES.PRACTICS} element={<Practics />} />
        <Route path="*" element={<Navigate replace to={ROUTES.MAIN} />} />
      </Routes>
    </Suspense>
  );
};
