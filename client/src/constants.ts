export enum ReactionsType {
  THUMBS_UP = 'THUMBS_UP',
  THUMBS_DOWN = 'THUMBS_DOWN',
  HEART = 'HEART',
  LAUGH = 'LAUGH',
  PARTY = 'PARTY',
  CHAT = 'CHAT',
  ADD = 'ADD',
}

export const ReactionEmojis = {
  [ReactionsType.THUMBS_UP]: '👍',
  [ReactionsType.THUMBS_DOWN]: '👎',
  [ReactionsType.HEART]: '❤️',
  [ReactionsType.LAUGH]: '😂',
  [ReactionsType.PARTY]: '🥳',
  [ReactionsType.CHAT]: '💬',
  [ReactionsType.ADD]: '➕',
}
