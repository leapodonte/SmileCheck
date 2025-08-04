import { globalErrorHandling } from "./middlewares/GlobalErrorHandling.js";
import { AppError } from "./utils/AppError.js";

export function bootstrap(app) {
  // All authentication is now handled by NextAuth in the frontend
  // Only keep essential routes if needed for other functionality

  app.all("*", (req, res, next) => {
    next(new AppError("Endpoint was not found", 404));
  });

  app.use(globalErrorHandling);
}
