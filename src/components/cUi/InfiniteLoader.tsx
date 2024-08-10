import React, { Children, PropsWithChildren } from 'react'
import {useInView} from 'react-intersection-observer'
interface TInfiniteLoaderProps extends PropsWithChildren{
    reachedBottomHandler : ()=> void,
    className?: string
}
export default function InfiniteLoader({reachedBottomHandler, className, children}:TInfiniteLoaderProps) {
    const {ref} = useInView({
        rootMargin:'200px',
        onChange(inView, entry) {
            if(inView){
                reachedBottomHandler()
            }
        },
    })
  return (
    <div className={className}>
      {children}
      <div ref={ref}></div>
    </div>
  )
}
