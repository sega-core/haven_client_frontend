import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HEADER_TITLE } from "../Header.constants";
import { ROUTES } from "../../../containers/Routes";
import { tokenService } from "../../../utils";

export const useRouteTitle = () => {
  const { pathname } = useLocation();

  const { accessToken } = tokenService.getJwtToken();

  const title = useMemo(() => {
    return HEADER_TITLE[pathname as keyof typeof HEADER_TITLE];
  }, [pathname]);

  const isVisibleHeader = ![
    ROUTES.LOGIN,
    ROUTES.ERROR,
    ROUTES.PROFILE,
    ROUTES.TARGETS,
    ROUTES.BREATH,
    ROUTES.META_CARD,
    ROUTES.AUDIO_HELP,
    ROUTES.REGISTRATION,
    ROUTES.PAYMENT
  ].some((route) => route === pathname) && !!accessToken;

  const isVisibleBreadcrumb = [
    ROUTES.PROFILE,
    ROUTES.TARGETS,
    ROUTES.BREATH,
    ROUTES.META_CARD,
    ROUTES.AUDIO_HELP,
    ROUTES.REGISTRATION,
    ROUTES.PAYMENT,
    ROUTES.ADMIN_PANEL
  ].some((route) => pathname.includes(route));

  return { title, isVisibleHeader, isVisibleBreadcrumb };
};
