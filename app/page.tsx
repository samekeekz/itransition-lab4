import UsersTable from "@/components/UsersTable/UsersTable";


export default async function Home() {
  const users = await prisma?.user.findMany();


  return (
    <>
      <UsersTable users={users} />
    </>
  );
}
