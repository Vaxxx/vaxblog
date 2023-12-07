
import {withAuth} from "next-auth/middleware";
// export {default} from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: async({req, token}) => {
            if(req.nextUrl.pathname.startsWith("/admin"))
                return token?.role === "admin";
            if(req.nextUrl.pathname.startsWith("/basic"))
                return token?.role === "basic";
            return !! token
        },
    },
});

export const config = {
    matcher: [
        "/user/:path*",
        "/admin/:path*",
    ]
}