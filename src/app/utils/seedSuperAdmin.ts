import { envVars } from "../config/env";
import { IAUTHPROVIDER, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdmin = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });
    if (isSuperAdmin) {
      return;
    }
    const pass = await bcryptjs.hash(envVars.SUPER_ADMIN_PASS, 10);
    const authProvider: IAUTHPROVIDER = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };
    const payload = {
      name: "super-admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: pass,
      isVerified: true,
      auths: [authProvider],
    };
    const superAdmin = await User.create(payload);
  } catch (error) {
    console.log(error);
    // next(error)
  }
};
