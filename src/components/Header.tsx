import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { pathname } = useRouter();
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();

  if (!userLoaded) return <div />;

  return (
    <nav className="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 ">
        <Link href="/" className="flex items-center">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3"
            width={32}
            height={32}
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Skill Search
          </span>
        </Link>
        <div className="flex md:order-2">
          {!isSignedIn ? (
            <SignInButton>
              <button
                type="button"
                className="mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
              >
                Sign in
              </button>
            </SignInButton>
          ) : (
            <Image
              height={32}
              width={32}
              src={user.profileImageUrl}
              alt="Profile image"
              className="rounded-full"
            />
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 md:dark:bg-gray-900">
            <li>
              <Link
                href="/"
                className={clsx(
                  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500",
                  pathname == "/" &&
                    "bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                )}
              >
                Find
              </Link>
            </li>
            <li>
              <Link
                href="/trending"
                className={clsx(
                  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500",
                  pathname == "/trending" &&
                    "bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                )}
              >
                Trending
              </Link>
            </li>
            <li>
              <a
                href="/about"
                className={clsx(
                  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500",
                  pathname == "/about" &&
                    "bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                )}
              >
                About
              </a>
            </li>
            <li>
              <Link
                href="/profile"
                className={clsx(
                  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500",
                  pathname == "/profile" &&
                    "bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                )}
              >
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
