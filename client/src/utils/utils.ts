import { ReactionEmojis, ReactionsType } from '../constants'

export const getAllReactionExceptChatAndAdd = (): ReactionsType[] => {
  return Object.values(ReactionsType).filter(
    (reaction) =>
      reaction !== ReactionsType.CHAT && reaction !== ReactionsType.ADD
  )
}

export const getReactionType = (
  isCreatePost?: boolean,
  reaction?: ReactionsType
) => {
  if (isCreatePost) {
    return ReactionsType.CHAT
  } else if (reaction) {
    return reaction
  }
  return ReactionsType.ADD
}

export const getReactionEmoji = (
  reaction: ReactionsType | undefined
): string => {
  switch (reaction) {
    case ReactionsType.THUMBS_UP:
      return ReactionEmojis[ReactionsType.THUMBS_UP]
    case ReactionsType.THUMBS_DOWN:
      return ReactionEmojis[ReactionsType.THUMBS_DOWN]
    case ReactionsType.LAUGH:
      return ReactionEmojis[ReactionsType.LAUGH]
    case ReactionsType.HEART:
      return ReactionEmojis[ReactionsType.HEART]
    case ReactionsType.PARTY:
      return ReactionEmojis[ReactionsType.PARTY]
    case ReactionsType.ADD:
      return ReactionEmojis[ReactionsType.ADD]
    default:
      return ReactionEmojis[ReactionsType.CHAT]
  }
}

export const getTimeAgo = (timestamp: string) => {
  const now = new Date()
  const createdAt = new Date(timestamp)
  const diff = now.getTime() - createdAt.getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (diff < minute) {
    return `${Math.floor(diff / 1000)} seconds ago`
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)} minutes ago`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)} hours ago`
  } else if (diff < week) {
    return `${Math.floor(diff / day)} days ago`
  } else if (diff < month) {
    return `${Math.floor(diff / week)} weeks ago`
  } else if (diff < year) {
    return `${Math.floor(diff / month)} months ago`
  } else {
    return `${Math.floor(diff / year)} years ago`
  }
}
