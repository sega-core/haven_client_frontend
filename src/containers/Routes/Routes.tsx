import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes.constants";

export const AppRoutes = () => {
  const Main = lazy(() => import("../../pages/Main"));
  const Targets = lazy(() => import("../../pages/Targets"));
  const Comunity = lazy(() => import("../../pages/Comunity"));
  const Practice = lazy(() => import("../../pages/Practice"));

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.TARGETS} element={<Targets />} />
        <Route path={ROUTES.COMUNITY} element={<Comunity />} />
        <Route path={ROUTES.PRACTICE} element={<Practice />} />
        <Route path="*" element={<Navigate replace to={ROUTES.MAIN} />} />
      </Routes>
    </Suspense>
  );
};
