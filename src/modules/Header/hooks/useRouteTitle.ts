import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HEADER_TITLE } from "../Header.constants";
import { ROUTES } from "../../../containers/Routes";

export const useRouteTitle = () => {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    return HEADER_TITLE[pathname as keyof typeof HEADER_TITLE];
  }, [pathname]);

  const isVisibleHeader = ![
    ROUTES.LOGIN,
    ROUTES.ERROR,
    ROUTES.PROFILE,
    ROUTES.TARGETS,
    ROUTES.BREATH,
  ].some((route) => route === pathname);

  const isVisibleBreadcrumb = [ROUTES.PROFILE, ROUTES.TARGETS, ROUTES.BREATH].some(
    (route) => pathname.includes(route),
  );

  return { title, isVisibleHeader, isVisibleBreadcrumb };
};
