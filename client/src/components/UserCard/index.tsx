import { User } from "@/state/api";
import Image from "next/image";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  // console.log("user", user);
  return (
    <div className="flex items-center rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`/${user.profilePictureUrl}`}
          alt="profile picture"
          width={32}
          height={32}
          className="mr-4 h-8 w-8 rounded-full"
        />
      )}
      <div>
        <h3 className="text-lg font-semibold dark:text-white">
          {user.username}
        </h3>
        <p className="text-sm text-gray-600 dark:text-neutral-300">
          id: <strong>{user.userId}</strong>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
