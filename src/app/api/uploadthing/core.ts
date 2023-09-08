import { prisma } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    profilePictureUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async ({ req }) => {

            let cookie = req.cookies.get('next-auth.session-token')?.value;

            if(!cookie){
                cookie = req.cookies.get('__Secure-next-auth.session-token')?.value;
            }

            const session = await prisma.session.findFirst({ where: { sessionToken: cookie }, include: { user: true } });

            if (!session) throw new Error("Unauthorized");

            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await prisma.user.update({
                where: {
                    id: metadata.userId
                },
                data: {
                    image: file.url
                }
            })

            revalidatePath("/onboarding/account")
            revalidatePath("/dashboard/settings")

        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;