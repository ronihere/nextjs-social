"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Input, InputProps } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pe-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          title={showPassword ? "Hide password" : "Show password"}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-transparent text-muted-foreground hover:bg-gray-100"
        >
          {showPassword ? <Eye className="h-4" /> : <EyeOff className="h-4" />}
        </Button>
      </div>
    );
  },
);
Input.displayName = "PasswordInput";

export { PasswordInput };
