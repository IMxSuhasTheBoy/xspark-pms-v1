"use client";

import { useEffect } from "react";
import StoreProvider, { useAppSelector, useAppDispatch } from "./redux";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { setIsSidebarCollapsed } from "@/state";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        (event.key === "b" || event.key === "B" || event.key === "`")
      ) {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
      }
    };

    const handleClick = () => {
      if (!isSidebarCollapsed) {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    const mainElement = document.querySelector("main");
    if (window.innerWidth < 768) {
      mainElement?.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      mainElement?.removeEventListener("click", handleClick);
    };
  }, [dispatch, isSidebarCollapsed]);

  return (
    <div className="dashboardWrapper.tsx flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${isSidebarCollapsed ? "" : "md:pl-64"}`}
      >
        <Navbar />
        {children} {/* content part page.tsx*/}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
