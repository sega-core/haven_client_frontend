import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HEADER_TITLE } from "../Header.constants";
import { ERoutes } from "../../../containers/Routes";

export const useRouteTitle = () => {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    return HEADER_TITLE[pathname as ERoutes];
  }, [pathname]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return { title };
};
