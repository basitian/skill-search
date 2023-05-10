import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";

type SkillWithProfile = RouterOutputs["skill"]["search"][number];

const UserSkillListItem = (props: SkillWithProfile) => (
  <li>
    <Link href={`/profile/${props.profile.username}`}>
      <div className=" flex items-center justify-between py-3 sm:py-4">
        <div className="flex items-center space-x-4 text-start">
          <div className="flex-shrink-0">
            <Image
              width={36}
              height={36}
              className="rounded-full"
              src={props.profile.profileImageUrl}
              alt={props.profile.username}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {props.profile.username}
              <span className="ml-2 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                {`${props.skill.numOthersRating} ${
                  props.skill.numOthersRating === 1 ? "rating" : "ratings"
                } by others`}
              </span>
            </p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
              {`Added in ${new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(props.skill.createdAt)}`}
            </p>
          </div>
        </div>
        <div>
          <p className="mb-1  text-base font-semibold text-gray-900 dark:text-white">
            {props.skill.name}
          </p>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {Array.from(Array(5).keys()).map((_, index) => {
              return index < props.skill.ownRating ? (
                <IconStarFilled key={`${props.skill.id}_${index}`} className="h-5 w-5 text-yellow-400" />
              ) : (
                <IconStar key={`${props.skill.id}_${index}`} className="h-5 w-5 text-gray-300 dark:text-gray-500" />
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  </li>
);

export default UserSkillListItem;
