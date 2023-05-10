import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";
import { api } from "~/utils/api";

const UserSkills = (props: { userId: string }) => {
  const { data, isLoading } = api.skill.getSkillsByUserId.useQuery({
    userId: props.userId,
  });

  if (!data || data.length === 0) return <div>No skills yet</div>;

  return (
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
      {data.map((skill) => (
        <li key={skill.id} className="py-3 sm:py-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <h5 className="text-lg font-semibold">{skill.name}</h5>
              <span className="mx-2 h-1 w-1 rounded-full bg-gray-900 dark:bg-gray-500"></span>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {`Last update ${new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(skill.updatedAt)}`}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {Array.from(Array(5).keys()).map((_, index) => {
                return index < skill.ownRating ? (
                  <IconStarFilled className="h-5 w-5 text-yellow-400" />
                ) : (
                  <IconStar className="h-5 w-5 text-gray-300 dark:text-gray-500" />
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <p className="inline-flex items-center rounded bg-blue-100 p-1.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
              {skill.othersRating.toFixed(1)}
            </p>
            <p className="ml-2 font-medium text-gray-900 dark:text-white">
              Excellent
            </p>
            <span className="mx-2 h-1 w-1 rounded-full bg-gray-900 dark:bg-gray-500"></span>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {`${skill.numOthersRating} ratings`}
            </p>
            <Link
              href="#"
              className="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Read all reviews
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserSkills;
