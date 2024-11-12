import Link from "next/link";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  // const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <div className="Navbar.tsx flex items-center justify-between bg-white px-4 py-2 text-black dark:bg-black md:py-3">
      {/* search Bar */}
      <div className="flex w-4/6 items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            title="CTRL+` &nbsp; / &nbsp; CTRL+b"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-6 w-6 dark:text-white md:h-8 md:w-8" />
          </button>
        )}
        <div className="relative flex h-min w-full">
          {/* positioning the search icon within/ontop of the search bar container */}
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-yellow-500" />
          <input
            className="w-full rounded border-none bg-gray-100 p-1 pl-8 placeholder-gray-400 focus:border-transparent focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 md:py-2"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* icons of links */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded p-1 dark:hover:bg-gray-800 md:p-2`
              : `rounded p-1 hover:bg-gray-100 md:p-2`
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>

        <Link
          href="/api/settings"
          className={
            isDarkMode
              ? `h-min w-min rounded p-1 dark:hover:bg-gray-800 md:p-2`
              : `h-min w-min rounded p-1 hover:bg-gray-100 md:p-2`
          }
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>

        {/*  seperator verticle line */}
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
