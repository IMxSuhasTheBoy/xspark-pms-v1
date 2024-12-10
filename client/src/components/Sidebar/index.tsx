"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Handshake,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import { setIsSidebarCollapsed } from "@/state";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const { data: currentUser } = useGetAuthUserQuery({});
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

  return (
    <div
      className={`Sidebar.tsx fixed z-40 flex h-full ${isSidebarCollapsed ? "hidden w-0" : "w-64"} flex-col justify-between overflow-y-auto bg-white shadow-2xl transition-all duration-1000 dark:bg-black dark:shadow-gray-800`}
    >
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* top logo */}
        <div className="top-logo z-50 flex w-64 items-center justify-between bg-white pl-8 pr-6 dark:bg-black md:min-h-[56px] md:pt-3">
          <Link href="/">
            <div className="text-xl font-bold text-yellow-400 hover:text-yellow-500">
              xSpark <span className="text-gray-500">™</span>
            </div>
          </Link>

          {!isSidebarCollapsed && (
            <button
              title="CTRL+` &nbsp; / &nbsp; CTRL+b"
              className="py-3 dark:text-white"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 dark:text-white md:h-8 md:w-8" />
            </button>
          )}
        </div>
        {/* team section */}
        <div className="team-section flex items-center gap-3 border-b-[0.5px] border-gray-200 bg-gray-100 px-8 py-4 dark:border-gray-900 dark:bg-gray-950">
          {/* <Image src="/shooting-star.png" alt="Logo" width={40} height={40} /> */}
          <Handshake className="h-8 w-8 text-gray-800 dark:text-white" />
          <div>
            {/* //TODO: dyamic team name */}
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              Name Team
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs tracking-wider text-gray-400">Private</p>
            </div>
          </div>
        </div>
        {/* navbar links */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Search} label="Search" href="/api/search" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/api/timeline" />
          <SidebarLink icon={User} label="Users" href="/api/users" />
          <SidebarLink icon={Users} label="Teams" href="/api/teams" />
          <SidebarLink icon={Settings} label="Settings" href="/api/settings" />
        </nav>
        {/* PROJECTS LINKS */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-400"
        >
          <span>Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* Projects list */}
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={FolderGit2}
              isSmallIcon
              label={project.name}
              href={`/api/projects/${project.id}`}
            />
          ))}
        {/* PRIORITIES LINKS */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-400"
        >
          <span>Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>{" "}
        {/* priorities list */}
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              iconClassNames="text-red-300 dark:text-red-900"
              href="/api/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              iconClassNames="text-yellow-300 dark:text-yellow-900"
              href="/api/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              iconClassNames="text-green-300 dark:text-green-900"
              href="/api/priority/medium"
            />
            <SidebarLink
              icon={AlertOctagon}
              label="Low"
              iconClassNames="text-blue-200 dark:text-blue-950"
              href="/api/priority/low"
            />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              iconClassNames="text-gray-300 dark:text-gray-600"
              href="/api/priority/backlog"
            />
          </>
        )}
      </div>
      <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
        <div className="flex w-full items-center">
          <div className="align-center flex h-9 w-9 justify-center">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>
          <button
            className="self-start rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  isSmallIcon?: boolean;
  label: string;
  iconClassNames?: string;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isSmallIcon = false,
  iconClassNames = "",
}: SidebarLinkProps) => {
  const pathname = usePathname();
  //  match the pathname with the href, exceptional matching for Home (dashboard)
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  // const screenWidth = window.innerWidth;

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-800 ${
          isActive
            ? "dark:to-bg-black to-bg-white bg-gradient-to-r from-gray-300 text-white dark:bg-gradient-to-r dark:from-gray-700"
            : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon
          className={`${isSmallIcon ? "h-5 w-5" : "h-6 w-6"} text-gray-800 dark:text-gray-100 ${iconClassNames} md:h-6 md:w-6`}
        />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
