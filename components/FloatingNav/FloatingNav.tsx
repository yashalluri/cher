"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NavItem = {
  name: string;
  link: string;
  icon?: string;
};

type FloatingNavProps = {
  className?: string;
  navItems: Array<{
    name: React.ReactNode;
    link: React.ReactNode;
    icon?: React.ReactNode;
  }>;
  loginButton?: React.ReactNode;
};

const FloatingNav = ({ navItems, className, loginButton }: FloatingNavProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsInitial(true);
      } else {
        setIsInitial(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      if (previous !== undefined) {
        let direction = current - previous;
        if (scrollYProgress.get() < 0.05) {
          setVisible(false);
        } else {
          if (direction < 0) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }
      }
    }
  });

  const transformedNavItems: NavItem[] = navItems.map((item) => ({
    name: item.name as string,
    link: item.link as string,
    icon: item.icon as string,
  }));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: isInitial ? 0 : visible ? 0 : -100, opacity: visible || isInitial ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          isInitial ? className : "fixed top-10 inset-x-0"
        )}
      >
        {transformedNavItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            {navItem.icon && <i className={navItem.icon}></i>}
            <span className="text-sm">{navItem.name}</span>
          </Link>
        ))}
        {loginButton && (
          <div className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
            {loginButton}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;
