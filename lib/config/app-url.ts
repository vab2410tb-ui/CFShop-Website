export const getAppUrl = () => {
  const appUrl =
    process.env.APP_URL ??
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : undefined);

  if (!appUrl) {
    throw new Error("APP_URL is not configured");
  }

  return appUrl.replace(/\/$/, "");
};
