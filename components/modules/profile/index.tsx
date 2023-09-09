"use client";
import { IUser } from "@/types";
import { useState } from "react";
import ProfileEdit from "./profile-edit";
import UserCard from "./user-card";
type Props = {
  user: IUser;
};
const UserProfile = ({ user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className=" grid grid-cols-3 py-[8px] px-[10px] gap-8 ">
      <UserCard user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
      {isEditing ? (
        <ProfileEdit setIsEditing={setIsEditing} />
      ) : // <div className=""> DATA</div>
      null}
    </div>
  );
};

export default UserProfile;
