declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    PORT: number;
    BCRYPT_SALT: number;
    DATABASE_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_EXPIRES_IN: string;
    JWT_RESET_PASSWORD_SECRET: string;
    JWT_RESET_PASSWORD_EXPIRES_IN: string;
    RESET_PASSWORD_UI_LINK: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    TRANSPORTER_EMAIL_AUTH_USER: string;
    TRANSPORTER_EMAIL_AUTH_PASSWORD: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    SSL_STORE_ID: string;
    SSL_STORE_PASSWORD: string;
    SSL_SUCCESS_URL: string;
    SSL_CANCEL_URL: string;
    SSL_FAIL_URL: string;
    SSL_PAYMENT_API: string;
    SSL_VALIDATION_API: string;
  };
}
