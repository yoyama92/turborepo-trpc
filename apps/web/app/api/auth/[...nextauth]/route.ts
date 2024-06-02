import NextAuth from "next-auth";
import { option } from "../../../../libs/authOption";

const handler = NextAuth(option);

export { handler as GET, handler as POST };
