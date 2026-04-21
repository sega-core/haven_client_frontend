import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes.constants";

export const AppRoutes = () => {
  const Login = lazy(() => import("../../pages/Login"));
  const Main = lazy(() => import("../../pages/Main"));
  const Targets = lazy(() => import("../../pages/Targets"));
  const Comunity = lazy(() => import("../../pages/Comunity"));
  const Practice = lazy(() => import("../../pages/Practice"));
  const Error = lazy(() => import("../../pages/Error"));
  const Profile = lazy(() => import("../../pages/Profile"));
  const Subscription = lazy(() => import("../../pages/Subscription"));
  const Faq = lazy(() => import("../../pages/Faq"));
  const Terms = lazy(() => import("../../pages/Terms"));
  const Privacy = lazy(() => import("../../pages/Privacy"));
  const Archive = lazy(() => import("../../pages/Archive"));
  const Breath = lazy(() => import("../../pages/Breath"));
  const MetaCard = lazy(() => import("../../pages/MetaCard"));
  const AudioHelp = lazy(() => import("../../pages/AudioHelp"));

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.TARGETS} element={<Targets />} />
        <Route path={ROUTES.COMUNITY} element={<Comunity />} />
        <Route path={ROUTES.PRACTICE} element={<Practice />} />
        <Route path={ROUTES.ARCHIVE} element={<Archive />} />
        <Route path={ROUTES.BREATH} element={<Breath />} />
        <Route path={ROUTES.META_CARD} element={<MetaCard />} />
        <Route path={ROUTES.AUDIO_HELP} element={<AudioHelp />} />
        <Route path={ROUTES.ERROR} element={<Error />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.SUBSCRIPTION} element={<Subscription />} />
        <Route path={ROUTES.FAQ} element={<Faq />} />
        <Route path={ROUTES.TERMS} element={<Terms />} />
        <Route path={ROUTES.PRIVACY} element={<Privacy />} />
        <Route path="*" element={<Navigate replace to={ROUTES.LOGIN} />} />
      </Routes>
    </Suspense>
  );
};
