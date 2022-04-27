import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import Cookies from "js-cookie";

const secret = process.env.NEXT_PUBLIC_SECRET;

export default function middleware(req) {
    const { cookies } = req;

    const jwt = cookies.token;

    const url = req.url;

    if (url.includes("/login") || url.includes("/register")) {
        if (jwt) {
            try {
                verify(jwt, secret);
                return NextResponse.redirect(
                    new URL("/user/landingPageUser", url)
                );
            } catch (error) {
                return NextResponse.next();
            }
        }
    }

    if (url.includes("/user")) {
        if (jwt === undefined) {
            return NextResponse.redirect(new URL("/", url));
        }

        try {
            verify(jwt, secret);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/", url));
        }
    }
    NextResponse.next();
}
