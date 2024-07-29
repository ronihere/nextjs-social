import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Bell, Home, MessageCircle, SaveIcon } from 'lucide-react'
type TMenubarProps= {
    className?: string
}
export default function Menubar({className}: TMenubarProps) {
  return (
    <div className={className}>
        <Button
        variant="ghost"
        title='Home'
        className='flex justify-start gap-2 items-center'
        asChild
        >
            <Link href={'/'}>
            <Home/>
            <span className='hidden lg:inline'>Home</span>
            </Link>

        </Button>
        <Button
        variant="ghost"
        title='Notifications'
        className='flex justify-start gap-2 items-center'
        asChild
        >
            <Link href={'/'}>
            <Bell/>
            <span className='hidden lg:inline'>Notifications</span>
            </Link>

        </Button>
        <Button
        variant="ghost"
        title='Messages'
        className='flex justify-start gap-2 items-center'
        asChild
        >
            <Link href={'/'}>
            <MessageCircle/>
            <span className='hidden lg:inline'>Messages</span>
            </Link>

        </Button>

        <Button
        variant="ghost"
        title='Saved'
        className='flex justify-start gap-2 items-center'
        asChild
        >
            <Link href={'/'}>
            <SaveIcon/>
            <span className='hidden lg:inline'>Saved</span>
            </Link>

        </Button>
      
    </div>
  )
}
