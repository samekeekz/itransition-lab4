import UsersTable from "@/components/UsersTable/UsersTable";
import prisma from "@/prisma/prisma";

export const dynamic = "force-dynamic";


async function Home() {
  const users = await prisma?.user.findMany();
  
  return (
    <>
      <UsersTable users={users} />
    </>
  );
}

export default Home;
