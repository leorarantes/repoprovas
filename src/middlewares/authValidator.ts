import jwt from "jsonwebtoken";

import "../setup.js";

export async function validateToken(req, res, next) {
    const authorization: string = req.headers.authorization || "";
    const token: string = authorization.replace("Bearer ", "");

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