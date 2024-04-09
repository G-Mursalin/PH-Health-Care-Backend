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
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  ssl_store_id: process.env.SSL_STORE_ID,
  ssl_store_password: process.env.SSL_STORE_PASSWORD,
  ssl_success_url: process.env.SSL_SUCCESS_URL,
  ssl_cancel_url: process.env.SSL_CANCEL_URL,
  ssl_fail_url: process.env.SSL_FAIL_URL,
  ssl_payment_api: process.env.SSL_PAYMENT_API,
  ssl_validation_api: process.env.SSL_VALIDATION_API,
};
