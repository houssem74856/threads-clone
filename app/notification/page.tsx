import { getNotifications } from '@/actions/queries/notification actions/getNotifications'
import { fetchCurrentUser } from '@/actions/queries/user action/fetchUser'
import Header from '@/components/Header'
import React from 'react'

async function page() {
  const { notifications, error } = await getNotifications()
  const {currentUser} = await fetchCurrentUser()

  if(error) {
    return (
      <div>somthing went wrong : {error.message}</div>
    )
  }

  return (
    <div className="bg-neutral-900 p-3 m-2 rounded-lg w-full">
      <Header user={currentUser}/>
      <h1 className="text-white text-2xl font-semibold mt-4 mb-1">
        Notifications
      </h1>
      { notifications.length === 0 ? (
        <div className="text-neutral-400">
          No notifications.
        </div>
      ) : (
        <div
          className="flex flex-col gap-y-2" 
        >
          {notifications.map((notification) => (
            <div 
              className="
                flex 
                flex-col
                gap-y-3
                bg-neutral-800/50 
                w-full 
                p-2 
                rounded-md
              "
              key={notification.id}
            >
              <p className="pl-1 text-xl font-medium">
                {notification.body}
              </p>
            </div>   
          ))}
        </div>
      )}
    </div>
  )
}

export default page