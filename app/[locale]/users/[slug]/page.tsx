import UserProfile from "@/components/modules/profile";
import { getUserById } from "@/helpers/getUserById";
import { IUser } from "@/types";

type Props = {
  params: {
    slug: string;
  };
};
const User = async ({ params: { slug } }: Props) => {
  const user = await getUserById(slug);

  return <UserProfile user={user as IUser} />;
};

export default User;
