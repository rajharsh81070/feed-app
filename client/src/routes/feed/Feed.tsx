import { Textarea } from '@material-tailwind/react'
import React from 'react'
import ReactionPopover from '../../components/reaction-popover/ReactionPopover'
import Button from '../../components/button/Button'
import { ReactionsType } from '../../constants'
import Spinner from '../../components/spinner/Spinner'

const Feed: React.FC = () => {
  const [name, setName] = React.useState<string>('Harsh')
  const [post, setPost] = React.useState<string>('')
  const [reaction, setReaction] = React.useState<ReactionsType | undefined>(
    undefined
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target

    setPost(value.trim())
  }

  const onReactionChange = (reaction: ReactionsType) => {
    setReaction(reaction)
  }

  const handlePostClick = () => {
    console.log('post--->', post)
  }

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

  const renderCreatePost = () => {
    return (
      <div className="bg-[#27292D] w-full border-solid rounded-lg border-2 border-[#35373B] flex flex-col px-5 py-6 gap-4">
        <div className="flex w-full items-start">
          <p className="text-[#C5C7CA] text-lg font-sans font-medium">
            Create Post
          </p>
        </div>
        <div className="bg-[#191920] p-4 rounded-lg flex items-start justify-start">
          <ReactionPopover isCreatePost={true} />
          <Textarea
            rows={1}
            value={post}
            resize={false}
            placeholder="How are you feeling today?"
            className="min-h-full !border-0 focus:border-transparent placeholder:text-[#7F8084] !text-[#7F8084] !text-base !font-sans !font-normal"
            containerProps={{
              className: 'grid h-full',
            }}
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full flex items-end justify-end">
          <div className="w-[112px]">
            <Button
              label="Post"
              disabled={post.length === 0}
              onClick={handlePostClick}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderPost = () => {
    return (
      <div className="bg-[#27292D] w-full border-solid rounded-lg border-2 border-[#35373B] flex flex-col px-5 py-6 gap-4">
        <div className="flex w-full items-start">
          <div className="flex gap-4 items-center justify-start flex-shrink-0">
            <img
              src="https://avatars.githubusercontent.com/u/0"
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
        </div>
        <div className="bg-[#191920] p-4 rounded-lg gap-4 flex items-start justify-start">
          <ReactionPopover
            reaction={reaction}
            handleReactionChange={onReactionChange}
          />
          <p className="text-[#7F8084] text-base font-sans font-normal">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#131319] p-4 flex sm:items-center flex-col overflow-scroll min-h-screen w-full h-full">
      <div className="flex flex-col lg:max-w-[700px] gap-10">
        {renderHeader()}
        <div className="flex flex-col flex-shrink gap-4">
          {renderCreatePost()}
          {renderPost()}
          <div className="flex w-full items-center justify-center">
            <div className="flex-grow border-t-[1px] border-solid border-[#7F8084]" />
            <p className="mx-1 text-[#7F8084] text-base font-sans font-normal">
              That's it!!
            </p>
            <div className="flex-grow border-t-[1px] border-solid border-[#7F8084]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed
