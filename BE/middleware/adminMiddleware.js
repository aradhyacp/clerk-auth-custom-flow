import { getAuth } from "@clerk/express";

const verifyAdminMiddleware = (req, res, next) => {
  const auth = getAuth(req);
  if (!auth?.isAuthenticated) return res.status(401).json({ message: "Unauthorized" });
  if (auth.sessionClaims.metadata.role !== "admin") {
    return res.status(401).json({ message: 'you are not admin' });
  }
  req.userId = auth.userId;
  next();
};

export default verifyAdminMiddleware