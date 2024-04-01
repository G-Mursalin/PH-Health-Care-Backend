import { Router } from "express";
import { userRoutes } from "../modules/User/user.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import { specialtyRoutes } from "../modules/Specialty/specialty.routes";
import { doctorRoutes } from "../modules/Doctor/doctor.routes";

const router = Router();

const appRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/specialty",
    route: specialtyRoutes,
  },
  {
    path: "/doctor",
    route: doctorRoutes,
  },
];

appRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
