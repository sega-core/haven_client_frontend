import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes.constants";
import { tokenService } from "../../utils";
import { useGetAuth } from "../../hooks";

export const AppRoutes = () => {
  // Public routes
  const Login = lazy(() => import("../../pages/Login"));
  const Registration = lazy(() => import("../../pages/Registration"));
  const Terms = lazy(() => import("../../pages/Terms"));
  const Privacy = lazy(() => import("../../pages/Privacy"));
  const Error = lazy(() => import("../../pages/Error"));

  // Private routes
  const Main = lazy(() => import("../../pages/Main"));
  const Targets = lazy(() => import("../../pages/Targets"));
  const Comunity = lazy(() => import("../../pages/Comunity"));
  const Practice = lazy(() => import("../../pages/Practice"));
  const Profile = lazy(() => import("../../pages/Profile"));
  const Subscription = lazy(() => import("../../pages/Subscription"));
  const Faq = lazy(() => import("../../pages/Faq"));
  const Archive = lazy(() => import("../../pages/Archive"));
  const Breath = lazy(() => import("../../pages/Breath"));
  const MetaCard = lazy(() => import("../../pages/MetaCard"));
  const AudioHelp = lazy(() => import("../../pages/AudioHelp"));
  const Payment = lazy(() => import("../../pages/Payment"));
  const PaymentSuccess = lazy(() => import("../../pages/PaymentSuccess"));
  const PaymentError = lazy(() => import("../../pages/PaymentError"));

  return (
    <Suspense fallback={<></>}>
      <Routes>
        {/* Public routes - доступны без авторизации */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.TERMS} element={<Terms />} />
        <Route path={ROUTES.PRIVACY} element={<Privacy />} />
        <Route path={ROUTES.ERROR} element={<Error />} />
        <Route path={ROUTES.PAYMENT_ERROR} element={<PaymentError />} />
        <Route path={ROUTES.PAYMENT_SUCCESS} element={<PaymentSuccess />} />

        {/* Semi-public - требует авторизации, но не принятия оферты */}
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />

        {/* Private routes - требуют авторизацию и принятие оферты */}
        <Route
          path={ROUTES.MAIN}
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.TARGETS}
          element={
            <PrivateRoute>
              <Targets />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.COMUNITY}
          element={
            <PrivateRoute>
              <Comunity />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.PRACTICE}
          element={
            <PrivateRoute>
              <Practice />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.ARCHIVE}
          element={
            <PrivateRoute>
              <Archive />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.BREATH}
          element={
            <PrivateRoute>
              <Breath />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.META_CARD}
          element={
            <PrivateRoute>
              <MetaCard />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.AUDIO_HELP}
          element={
            <PrivateRoute>
              <AudioHelp />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.SUBSCRIPTION}
          element={
            <PrivateRoute>
              <Subscription />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.FAQ}
          element={
            <PrivateRoute>
              <Faq />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.PAYMENT}
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to={ROUTES.MAIN} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.ERROR} replace />} />
      </Routes>
    </Suspense>
  );
};

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  useGetAuth();
  const { accessToken } = tokenService.getJwtToken();

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};
