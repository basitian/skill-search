import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { PageLayout } from "~/components/PageLayout";
import UserSkills from "~/components/UserSkills";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const UserProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data: profile } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!profile) return <div>404</div>;

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
                src={profile.profileImageUrl}
                alt="Neil image"
              />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {profile.username}
              </h5>
            </div>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {profile.bio}
          </p>
        </div>

        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Skills</h2>
          </div>
          <UserSkills userId={profile.id} />
        </div>
      </div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const username = context.params?.username;

  if (typeof username !== "string") throw new Error("no username");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default UserProfilePage;
