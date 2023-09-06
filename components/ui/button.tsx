"use client";

import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const variants = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "relative",
    "cursor-pointer",
    "disabled:cursor-not-allowed",
    "transition",
    "focus:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "w-auto",
          // "shadow",
          // "ring-offset-2",
          // "focus-visible:ring-2",
          // "ring-indigo-500/70",
        ],

        secondary: [
          "font-semibold",
          "bg-red-500",
          "hover:bg-red-600",
          "text-white",
          "rounded-md",
          "shadow",
          "hover:shadow-md",
          "disabled:bg-red-500/50",
          "disabled:shadow",
          "ring-offset-2",
          "focus-visible:ring-2",
          "ring-red-500",
        ],
        rounded: ["rounded-full"],
      },
      // size: {
      //   small: ["text-sm", "py-1", "px-4"],
      //   default: ["text-base", "py-2", "px-8"],
      //   large: ["text-lg", "py-3", "px-12"],
      //   full: ["text-base", "py-2", "px-8", "w-full"],
      // },
    },
    defaultVariants: {
      variant: "primary",
      // size: "default",
    },
  }
);

const loading = cva(["absolute", "inline-flex", "items-center"], {
  variants: {
    variant: {
      primary: ["border-white"],
      secondary: ["border-gray-950"],
      rounded: ["border-indigo-500"],
    },
  },
});

const Loading = ({ variant }: VariantProps<typeof loading>) => (
  <div className={loading({ variant })}>
    <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]" />
  </div>
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & {
    loading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, loading, ...rest }, ref) => (
    <button
      ref={ref}
      className={twMerge(clsx(variants({ variant, className })))}
      {...rest}
    >
      {loading && <Loading variant={variant} />}
      <span
        className={clsx("transition", {
          "opacity-0": loading,
          "opacity-100": !loading,
        })}
      >
        {children}
      </span>
    </button>
  )
);

Button.displayName = "Button";

export default React.memo(Button);
export type { ButtonProps };
