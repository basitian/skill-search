import { useUser } from "@clerk/nextjs";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { type NextPage } from "next";
import Image from "next/image";
import { PageLayout } from "~/components/PageLayout";

const ProfilePage: NextPage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return <div>Loading</div>;

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl space-y-4 bg-white px-4 py-8 dark:bg-gray-900">
        <div className="w-full space-y-3 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                className="rounded-full"
                width={64}
                height={64}
                src={user.profileImageUrl}
                alt="Neil image"
              />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {user.username}
              </h5>
            </div>

            <button
              type="button"
              className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <IconEdit aria-hidden="true" className="-ml-1 mr-2 h-5 w-5" />
              Edit Bio
            </button>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here goes the bio
          </p>
        </div>

        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <button
              type="button"
              className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <IconPlus aria-hidden="true" className="-ml-1 mr-2 h-5 w-5" />
              Add Skill
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
