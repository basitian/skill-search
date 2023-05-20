import { api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";
import { Rating, Star } from "@smastrom/react-rating";
import { useState } from "react";
import { toast } from "react-hot-toast";

type UserSkillsProps = {
  userId: string;
  ownRating?: boolean;
};

const UserSkills = ({ userId, ownRating = false }: UserSkillsProps) => {
  const [ratingDisabled, setRatingDisabled] = useState(false);

  const { data, isLoading, refetch } = api.skill.getSkillsByUserId.useQuery({
    userId: userId,
  });

  const { mutateAsync } = api.skill.rateSkill.useMutation({
    onSuccess: async () => {
      await refetch();
      toast.success("Rating updated!");
      setRatingDisabled(false);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to update rating ! Please try again later.");
      }
      setRatingDisabled(false);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (!data || data.length === 0)
    return <div className="text-center">No skills yet</div>;

  const handleRatingSubmission = async (
    skillId: string,
    selectedValue: number
  ) => {
    try {
      setRatingDisabled(true);
      await mutateAsync({ skillId, rating: selectedValue });
    } catch (err) {
      setRatingDisabled(false);
    }
  };

  return (
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
      {data.map((skill) => (
        <li key={skill.id} className="py-3 sm:py-4">
          <div className="mb-3 flex items-center justify-between">
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
            <Rating
              className="max-w-[120px]"
              value={skill.ownRating}
              isDisabled={ratingDisabled}
              readOnly={!ownRating}
              itemStyles={{
                itemShapes: Star,
                activeFillColor: "#f59e0b",
                inactiveFillColor: "#c7c7c7",
              }}
              onChange={(selectedValue: number) =>
                handleRatingSubmission(skill.id, selectedValue)
              }
            />
            {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {Array.from(Array(5).keys()).map((_, index) => {
                return index < skill.ownRating ? (
                  <IconStarFilled
                    key={`${skill.id}_${index}`}
                    className="h-5 w-5 text-yellow-400"
                  />
                ) : (
                  <IconStar
                    key={`${skill.id}_${index}`}
                    className="h-5 w-5 text-gray-300 dark:text-gray-500"
                  />
                );
              })}
            </div> */}
          </div>
          <div className="flex items-center">
            <p className="inline-flex items-center rounded bg-purple-100 p-1.5 text-sm font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              {skill.othersRating.toFixed(1)}
            </p>
            <p className="ml-2 font-medium text-gray-900 dark:text-white">
              Overall Rating
            </p>
            <span className="mx-2 h-1 w-1 rounded-full bg-gray-900 dark:bg-gray-500"></span>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {`${skill.numOthersRating} ratings`}
            </p>
            {/* <Link
              href="#"
              className="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Read all reviews
            </Link> */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserSkills;
