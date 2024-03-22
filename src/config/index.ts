import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  bcrypt_salt: process.env.BCRYPT_SALT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expired_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expired_in: process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_reset_password_secret: process.env.JWT_RESET_PASSWORD_SECRET,
  jwt_reset_password_expires_in: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  transporter_email_auth_user: process.env.TRANSPORTER_EMAIL_AUTH_USER,
  transporter_email_auth_password: process.env.TRANSPORTER_EMAIL_AUTH_PASSWORD,
};
