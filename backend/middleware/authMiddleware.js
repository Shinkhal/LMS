import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id: user._id }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
 