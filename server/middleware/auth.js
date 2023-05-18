import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(" ")[1];
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user_id = decodedData?.user_id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
