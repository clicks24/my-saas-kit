import { getServerSession } from "next-auth";
import { authOptions } from "./options";
import { redirect } from "next/navigation";
import { prisma } from "../database";

export async function getSignedInUser() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/sign-in")
    }

    if (session.user.onboarded == false) {
        redirect("/auth/setup-account")
    }

    return session;
}