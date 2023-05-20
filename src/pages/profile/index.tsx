import { useUser } from "@clerk/nextjs";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { PageLayout } from "~/components/PageLayout";
import ProfileAvatar from "~/components/ProfileAvatar";
import UserSkills from "~/components/UserSkills";
import { api } from "~/utils/api";
import AddSkillModal from "~/components/AddSkillModal";

const ProfilePage: NextPage = () => {
  const { user, isLoaded } = useUser();
  const { register, handleSubmit, setValue } = useForm<{ bio: string }>();
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [disableBioField, setDisableBioField] = useState(false);

  useEffect(() => {
    if (isLoaded && user && user.username) {
      setValue("bio", user.publicMetadata.bio as string);
    }
  }, [user, isLoaded, setValue]);

  const { mutate } = api.profile.updateBio.useMutation({
    onSuccess: () => {
      toast.success("Bio updated!");
      setDisableBioField(false);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to update bio! Please try again later.");
      }
      setDisableBioField(false);
    },
  });

  const onChangeBioSubmit: SubmitHandler<{ bio: string }> = (data) => {
    setDisableBioField(true);
    mutate({ bio: data.bio });
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl space-y-4 bg-white px-4 py-8 dark:bg-gray-900">
        {!isLoaded || !user || !user.username ? (
          <div>Loading</div>
        ) : (
          <>
            <form onSubmit={handleSubmit(onChangeBioSubmit)}>
              <div className="w-full space-y-3 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <ProfileAvatar
                    profileImageUrl={user.profileImageUrl}
                    username={user.username}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <IconEdit
                      aria-hidden="true"
                      className="-ml-1 mr-2 h-5 w-5"
                    />
                    Update Bio
                  </button>
                </div>

                <textarea
                  {...register("bio", { required: true, maxLength: 80 })}
                  rows={3}
                  disabled={disableBioField}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Tell something about yourself..."
                />
              </div>
            </form>

            <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Skills</h2>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setShowAddSkillModal((sasm) => !sasm)}
                >
                  <IconPlus aria-hidden="true" className="-ml-1 mr-2 h-5 w-5" />
                  Add Skill
                </button>
              </div>

              <UserSkills userId={user.id} ownRating />
            </div>
          </>
        )}
      </div>
      <AddSkillModal show={showAddSkillModal} />
    </PageLayout>
  );
};

export default ProfilePage;
