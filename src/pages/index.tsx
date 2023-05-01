import { IconSearch } from "@tabler/icons-react";
import { type NextPage } from "next";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import Jumbo from "~/components/Jumbo";
import { PageLayout } from "~/components/PageLayout";
import UserSkillListItem from "~/components/UserSkillListItem";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<{ term: string }>();

  const [searchTerm, setSearchTerm] = useState("");

  const { data } = api.skill.search.useQuery({
    term: searchTerm,
  });

  const onSearchSubmit: SubmitHandler<{ term: string }> = (data) => {
    setSearchTerm(data.term);
  };

  return (
    <PageLayout>
      <div className="z-10 mx-auto max-w-screen-xl bg-white px-4 py-8 text-center dark:bg-gray-900 lg:py-16">
        <Jumbo />
        <form
          className="mx-auto mb-12 w-full max-w-md"
          onSubmit={handleSubmit(onSearchSubmit)}
        >
          <label
            htmlFor="skill-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search Skills
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <IconSearch className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="skill-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Skill..."
              {...register("term", { maxLength: 80 })}
            />

            <button
              type="submit"
              className="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Find
            </button>
          </div>
        </form>

        <div className="mx-auto mb-7 w-full max-w-md">
          <div className=" inline-flex items-center justify-between rounded-full bg-blue-100 px-1 py-1 pr-4 text-sm text-blue-700 dark:bg-blue-900 dark:text-blue-300 ">
            <span className="mr-3 rounded-full bg-blue-600 px-4 py-1.5 text-xs text-white">
              {data && data.length}
            </span>{" "}
            <span className="text-sm font-medium">
              {data && searchTerm !== ""
                ? `${
                    data.length === 1 ? "Result" : "Results"
                  } for your search for \"${searchTerm}\"`
                : "Recently added skills"}
            </span>
          </div>
        </div>

        <ul
          role="list"
          className="mx-auto max-w-2xl divide-y divide-gray-200 dark:divide-gray-700"
        >
          {data &&
            data.map((skillWithProfile) => (
              <UserSkillListItem
                key={skillWithProfile.skill.id}
                {...skillWithProfile}
              />
            ))}
        </ul>
      </div>
    </PageLayout>
  );
};

export default Home;
