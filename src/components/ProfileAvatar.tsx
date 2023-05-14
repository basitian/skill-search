import Image from "next/image";
import React from "react";

type ProfileAvatarProps = {
  profileImageUrl: string;
  username: string;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ profileImageUrl, username }) => {
  return (
    <div className="flex items-center space-x-4">
      <Image
        className="rounded-full"
        width={64}
        height={64}
        src={profileImageUrl}
        alt="Profile image"
      />
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {username}
      </h5>
    </div>
  );
};

export default ProfileAvatar;
