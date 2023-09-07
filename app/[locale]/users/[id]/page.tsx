import UserProfile from "@/components/modules/profile";
import { getUserById } from "@/helpers/getUserById";
import { IUser } from "@/types";

type Props = {
  params: {
    id: string;
  };
};
const User = async ({ params: { id } }: Props) => {
  const user = await getUserById(id);

  return <UserProfile user={user as IUser} />;
};

export default User;
