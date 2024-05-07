import { NextRouter } from "next/router";

const protectedRoutes = ["/"];

export const checkAuth = (router: NextRouter) => {
  const data = localStorage.getItem("userData");
  const isProtectedRoute = protectedRoutes.includes(router.pathname);

  if (!data && isProtectedRoute) {
    router.push("/login");
  }
};