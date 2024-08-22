import React from "react"
import { Button, ButtonProps } from "../ui/button"
import {  Loader2 } from "lucide-react"
import { cn } from "@/lib/utils";
interface LoadingButtonProps extends ButtonProps {
    loading: boolean;
  }
const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps >(
    ({ className, variant, size, asChild = false,children, loading, ...props }, ref) => {
        
      return <Button className={cn('flex gap-2', className)}>
        {loading && <Loader2 className='animate-spin size-5'/> }
        {children}
      </Button>
    }
  )
  LoadingButton.displayName = "LoadingButton"
  export default LoadingButton