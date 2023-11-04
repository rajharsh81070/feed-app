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

export const getReactionEmoji = (reaction: ReactionsType | undefined) => {
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
