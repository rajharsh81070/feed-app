import React from 'react'

const Feed: React.FC = () => {
  const [name, setName] = React.useState<string>('Harsh')

  const renderHeader = () => {
    return (
      <div className="flex flex-col items-start flex-shrink gap-3">
        <p className="text-[#C5C7CA] font-medium text-[28px]">Hello {name}</p>
        <p className="text-[#7F8084] text-base font-sans font-normal">
          How are you doing today? Would you like to share something with the
          community 🤗
        </p>
      </div>
    )
  }

  const renderPost = (isCreatePost: boolean) => {
    return (
      <div className="bg-[#27292D] w-full border-solid rounded-lg border-2 border-[#35373B] px-5 py-6 gap-4">
        <div className="flex w-full items-start">
          {isCreatePost ? (
            <p className="text-[#C5C7CA] text-lg font-sans font-medium">
              Create Post
            </p>
          ) : (
            <div className="flex gap-4 items-center justify-start flex-shrink-0">
              <img
                src="https://avatars.githubusercontent.com/u/55942632?v=4"
                alt="avatar"
                height={44}
                width={44}
                className="rounded-[44px] w-11 h-11 bg-[lightgray]"
              />
              <div className="flex flex-col">
                <p className="text-[#C5C7CA] text-base font-sans font-medium">
                  Harsh
                </p>
                <p className="text-[#7F8084] text-sm font-sans font-medium">
                  2 hours ago
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#131319] p-4 flex justify-center flex-col items-center min-h-screen w-full h-full">
      <div className="flex flex-col gap-10">
        {renderHeader()}
        <div className="flex flex-col flex-shrink gap-4">
          {renderPost(true)}
          {renderPost(false)}
        </div>
      </div>
    </div>
  )
}

export default Feed
