import jwt from "jsonwebtoken";

import "../setup.js";

export async function validateToken(req, res, next) {
    const authorization = req.header("Authorization");
    const token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).send("Token required.");
    }

    try {
        const user: any = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.id = user.id;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).send("Invalid token.");
    }
}

export default validateToken;