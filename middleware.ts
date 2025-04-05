import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        console.log('Middleware running for path:', req.nextUrl.pathname);
        console.log('Token exists:', !!req.nextauth?.token);
        
        if (!req.nextauth?.token) {
            console.log('No token found, redirecting to login');
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }
        
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                console.log('Authorized callback running, token exists:', !!token);
                return !!token;
            },
        },
        pages: {
            signIn: "/auth/login"
        },
    }
);

export const config = {
    matcher: ["/profile/:path*", "/dashboard/:path*"],
}; 