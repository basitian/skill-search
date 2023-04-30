import { type NextPage } from "next";
import AddSkillForm from "~/components/AddSkillForm";
import Header from "~/components/Header";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-20">
        <div className="z-10 mx-auto max-w-screen-xl bg-white px-4 py-8 dark:bg-gray-900">
          <div className="block max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  className="h-20 w-20 rounded-full"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="Neil image"
                />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Bastian Hunecke
                </h5>
              </div>

              <button
                type="button"
                className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Edit Bio
              </button>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here goes the bio
            </p>
          </div>

          <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
            <AddSkillForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
