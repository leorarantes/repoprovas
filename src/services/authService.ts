import bcrypt from "bcrypt";
import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";

import { ensureUserDoesntExist, ensureUserExistsAndGetData } from "../utils/usersUtil.js";
import "../setup.js";
import * as usersRepository from "../repositories/usersRepository.js";

export async function signUp(email: string, password: string) {
    await ensureUserDoesntExist(email);

    // create encrypted password
    const SALT = 14;
    const encryptedPassword: string = bcrypt.hashSync(password, SALT);

    await usersRepository.create(email, encryptedPassword);
}

export async function signIn(email: string, password: string) {
    const existingUser: Users = await ensureUserExistsAndGetData(email);

    // validate password
    const encryptedPassword: string = existingUser.password;
    if(!bcrypt.compareSync(password, encryptedPassword)) {
        throw { type: "error_unauthorized", message: "Invalid password." };
    }

    // get token
    const token: string = jwt.sign(
        {
            id: existingUser.id,
        },
        process.env.JWT_SECRET
    );
    return { token };
}