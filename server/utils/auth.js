const jwt = require("jsonwebtoken");

const secret = process.env.NOT_SECRET || "askdljfhasldkjf";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    console.log("hopefully", req.query?.token);

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ username, email, id }) {
    console.log(username, email, id);
    const payload = { username, email, id };
    console.log({ data: payload }, secret, { expiresIn: expiration });
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
