'use client'

// React Imports
import { useState } from 'react'

// Icon Imports
import { IconBell } from '@tabler/icons-react'

const NotificationBell = () => {
  // State
  const [hasNotifications, setHasNotifications] = useState(true)

  return (
    <div className='relative cursor-pointer text-textPrimary hover:text-primary transition-colors'>
      <IconBell size={24} stroke={1.5} />
      {hasNotifications && (
        <span className='absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-error ring-2 ring-white transform translate-x-1/4 -translate-y-1/4'></span>
      )}
    </div>
  )
}

export default NotificationBell
