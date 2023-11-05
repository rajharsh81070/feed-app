import {
  Avatar,
  Checkbox,
  Menu,
  MenuHandler,
  MenuList,
  Textarea,
  Typography,
} from '@material-tailwind/react'
import React, { useEffect, useMemo } from 'react'
import ReactionPopover from '../../components/reaction-popover/ReactionPopover'
import Button from '../../components/button/Button'
import { AccessToken, PostType, ReactionsType } from '../../constants'
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByUserQuery,
  useUpdatePostMutation,
} from '../../api/post.api'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IPost } from '../../api/types'
import { getTimeAgo } from '../../utils/utils'
import Spinner from '../../components/spinner/Spinner'
import { useGetMeQuery } from '../../api/user.api'
import Filters from '../../components/Filters/Filters'
import { useLogoutUserMutation } from '../../api/auth.api'
import { clearLocalStorageItem } from '../../utils/localStorage'

const Feed: React.FC = () => {
  const [content, setContent] = React.useState<string>('')
  const [isAnonymous, setIsAnonyous] = React.useState<boolean>(false)

  const { userState, postState } = useSelector((state: RootState) => state)
  const { user } = userState
  const { posts } = postState

  const [fetchAllPost, { isFetching: isFetchAllPost }] =
    useLazyGetAllPostsQuery()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { refetch: _fetchMe } = useGetMeQuery(null)
  const [updatePost] = useUpdatePostMutation()
  const [createPost, { isLoading: createPostLoading }] = useCreatePostMutation()
  const [fetchPostByUser, { isFetching: isFetchingPostByUser }] =
    useLazyGetPostByUserQuery()
  const [logoutUser] = useLogoutUserMutation()

  const isDataLoading = useMemo(
    () => isFetchAllPost || isFetchingPostByUser,
    [isFetchAllPost, isFetchingPostByUser]
  )

  useEffect(() => {
    fetchAllPost(PostType.NonAnoymous)
  }, [fetchAllPost])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target

    setContent(value)
  }

  const handleLogout = () => {
    logoutUser().then(() => {
      clearLocalStorageItem(AccessToken)
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      fetchPostByUser(user?.id ?? '')
    } else {
      fetchAllPost(PostType.NonAnoymous)
    }
  }

  const handleSelectChange = (value: PostType) => {
    fetchAllPost(value)
  }

  const onReactionChange = (postId: string, reaction: ReactionsType) => {
    updatePost({ id: postId, post: { reaction } })
  }

  const handlePostClick = () => {
    createPost({ content: content.trim(), isAnonymous: isAnonymous }).then(
      () => {
        setContent('')
        setIsAnonyous(false)
        fetchAllPost(PostType.NonAnoymous)
      }
    )
  }

  const renderHeader = () => {
    return (
      <div className="flex w-full flex-col items-start flex-shrink gap-3">
        <div className="flex w-full items-center justify-between">
          <p className="text-[#C5C7CA] font-medium text-[28px]">
            Hello {user?.userName}
          </p>
          <Menu>
            <MenuHandler>
              <Avatar
                variant="circular"
                alt={user?.userName ?? 'user'}
                className="cursor-pointer w-7 h-7"
                src="https://avatars.githubusercontent.com/u/0"
              />
            </MenuHandler>
            <MenuList>
              <Typography
                onClick={handleLogout}
                variant="small"
                className="font-medium cursor-pointer"
              >
                Sign Out
              </Typography>
            </MenuList>
          </Menu>
        </div>
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
        <div className="flex w-full items-center">
          <p className="text-[#C5C7CA] text-lg font-sans font-medium">
            Create Post
          </p>
          <div className="flex grow justify-end">
            <Checkbox
              checked={isAnonymous}
              ripple={false}
              onChange={(e) => setIsAnonyous(e.target.checked)}
              size={8}
              label="Anonymous Post"
              className="h-4 w-4"
              crossOrigin={false}
            />
          </div>
        </div>
        <div className="bg-[#191920] p-4 rounded-lg flex items-start justify-start">
          <ReactionPopover isCreatePost={true} />
          <Textarea
            rows={1}
            value={content}
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
              disabled={content.trim().length === 0 || createPostLoading}
              onClick={handlePostClick}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderPost = (post: IPost) => {
    return (
      <div
        key={post.id}
        className="bg-[#27292D] md:w-[700px] w-full border-solid rounded-lg border-2 border-[#35373B] flex flex-col px-5 py-6 gap-4"
      >
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
                {post.user?.userName}
              </p>
              <p className="text-[#7F8084] text-sm font-sans font-medium">
                {getTimeAgo(post?.createdAt ?? new Date().toString())}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#191920] p-4 rounded-lg gap-4 flex items-start justify-start">
          <ReactionPopover
            reaction={post.reaction}
            handleReactionChange={(reaction) =>
              onReactionChange(post.id, reaction)
            }
          />
          <p className="text-[#7F8084] text-base font-sans font-normal">
            {post.content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#131319] p-4 flex sm:items-center flex-col overflow-scroll min-h-screen w-full h-full">
      <div className="flex flex-col md:w-[700px] gap-10">
        {renderHeader()}
        <div className="flex flex-col flex-shrink gap-4">
          {renderCreatePost()}
          <Filters
            handleSelectChange={handleSelectChange}
            handleSwitchChange={handleSwitchChange}
          />
          {isDataLoading ? (
            <div className="flex items-center justify-center">
              <Spinner containerHeight="h-full" size={24} />
            </div>
          ) : (
            posts.map((post) => renderPost(post))
          )}
          {!isDataLoading && (
            <div className="flex w-full items-center justify-center">
              <div className="flex-grow border-t-[1px] border-solid border-[#7F8084]" />
              <p className="mx-1 text-[#7F8084] text-base font-sans font-normal">
                That's it!!
              </p>
              <div className="flex-grow border-t-[1px] border-solid border-[#7F8084]" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Feed
