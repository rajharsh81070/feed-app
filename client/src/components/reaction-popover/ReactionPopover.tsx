import {
  Popover,
  PopoverHandler,
  PopoverContent,
  IconButton,
} from '@material-tailwind/react'
import React, { useState } from 'react'
import { ReactionsType } from '../../constants'
import {
  getAllReactionExceptChatAndAdd,
  getReactionEmoji,
  getReactionType,
} from '../../utils/utils'

interface ReactionPopoverProps {
  isCreatePost?: boolean
  reaction?: ReactionsType
  handleReactionChange?: (reaction: ReactionsType) => void
}

const ReactionPopover: React.FC<ReactionPopoverProps> = ({
  isCreatePost,
  reaction,
  handleReactionChange,
}) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false)

  const triggers = {
    onMouseEnter: () => setOpenPopover(isCreatePost ? false : true),
    onMouseLeave: () => setOpenPopover(false),
    onClick: () => setOpenPopover(isCreatePost ? false : true),
  }

  const handleReactionClick = (reaction: ReactionsType) => {
    console.log('reaction--->', reaction)
    setOpenPopover(false)
    handleReactionChange?.(reaction)
  }

  return (
    <Popover open={openPopover} placement={'top-end'} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <IconButton
          className={`${
            isCreatePost ? 'cursor-default' : 'cursor-pointer'
          } bg-[#27292D]  h-12 w-12 p-4 rounded-full`}
        >
          {getReactionEmoji(getReactionType(isCreatePost, reaction))}
        </IconButton>
      </PopoverHandler>
      <PopoverContent
        {...triggers}
        className="bg-[#27292D] p-1 max-w-min border-solid rounded-lg border-1 border-[#35373B]"
      >
        <div className="flex items-center justify-center">
          {getAllReactionExceptChatAndAdd().map((reaction: ReactionsType) => (
            <IconButton
              key={reaction.toString()}
              variant="text"
              className="cursor-pointer"
              onClick={() => handleReactionClick(reaction)}
            >
              {getReactionEmoji(reaction)}
            </IconButton>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ReactionPopover
