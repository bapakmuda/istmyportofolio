import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/kamar-belakang/login",
  },
});

export const config = {
  matcher: ["/kamar-belakang/((?!login).*)"],
};
