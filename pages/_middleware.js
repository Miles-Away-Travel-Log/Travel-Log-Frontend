import { NextResponse } from "next/server";

export default function middleware(req) {
    const { cookies } = req;

    const jwt = cookies.token;

    const url = req.url;

    if (url.includes("/user")) {
        if (jwt === undefined) {
            return NextResponse.redirect(new URL("/", url));
        }
    }
    NextResponse.next();
}
