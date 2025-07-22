"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-[58px] w-full rounded-[25px] border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-extralight placeholder:text-placeholderSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-around",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "h-[58px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ElementType | string;
  showPasswordToggle?: boolean;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, icon: IconProp, showPasswordToggle, ...restProps },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPasswordType = type === "password";

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const currentType =
      isPasswordType && showPasswordToggle && !showPassword
        ? "password"
        : "text";

    return (
      <div className="relative flex items-center">
        {IconProp && (
          <div className="absolute left-4 text-gray-400">
            {typeof IconProp === "string" ? (
              <Icon icon={IconProp as string} className="h-5 w-5" />
            ) : (
              <IconProp className="h-5 w-5" />
            )}
          </div>
        )}
        <input
          type={currentType}
          className={cn(
            inputVariants({ className }),
            IconProp ? "pl-12" : "",
            showPasswordToggle ? "pr-12" : "",
            "text-black"
          )}
          ref={ref}
          {...restProps}
        />
        {showPasswordToggle && isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 text-gray-400 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon
              icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
              className="h-5 w-5"
            />
          </button>
        )}
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
