// all variables declared in api/declaration.ts

const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, process.env.JWT_CODE, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    req.user = decoded;
    return next();
  });
};

module.exports = checkAuth;