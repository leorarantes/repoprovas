import bcrypt from "bcrypt";
import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";
import axios from "axios";
import qs from "query-string";

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
    if (!bcrypt.compareSync(password, encryptedPassword)) {
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

export async function signInWithGitHub(code: string | (string | null)[]) {
    // get GitHub token
    const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
    const params = {
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URL,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    };

    const { data: gitHubTokenData }: { data: any } = await axios.post('https://github.com/login/oauth/access_token', params, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const gitHubToken: string | string[] = qs.parse(gitHubTokenData).access_token;

    // fetch user
    const { data: userData }: { data: any } = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${gitHubToken}`,
        },
    });
    const user: any = userData;

    // get app token
    const token: string = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET
    );
    return { token };
}