import { getAuth } from "@clerk/express";

const verifyUserMiddleware = (req, res, next) => {
  const auth = getAuth(req);
  if (!auth?.isAuthenticated) return res.status(401).json({ message: "Unauthorized" });
  if (auth.sessionClaims.metadata.role !== "user") {
    return res.status(401).json({ message: 'you are not user' });
  }
  req.userId = auth.userId;
  next();
};

export default verifyUserMiddleware