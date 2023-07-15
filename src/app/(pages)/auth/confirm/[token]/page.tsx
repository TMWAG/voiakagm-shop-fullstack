import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export default async function ConfirmEmailPage({
  params,
}: {
  params: {
    token: string;
  };
}){
  const user = await prisma.user.findUnique({
    where: { token: params.token},
  });
  if (user) {
    await prisma.user.update({
      where: { token: params.token },
      data: { verified: true, token: randomUUID() },
    });
  }
  return (
    <div
      className="
        my-40 w-2/3 flex justify-center
        text-2xl
      "
    >
        {user
        ?<span>Успешная активация аккаунта</span>
        :<span>Активация аккаунта не удалась</span>
        }
    </div>
  );
}
