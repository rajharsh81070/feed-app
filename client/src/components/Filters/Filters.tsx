import React from 'react'
import { PostType } from '../../constants'
import { Select, Switch, Option } from '@material-tailwind/react'

interface FiltersProps {
  handleSwitchChange: (checked: boolean) => void
  handleSelectChange: (value: PostType) => void
}

const Filters: React.FC<FiltersProps> = ({
  handleSwitchChange,
  handleSelectChange,
}) => {
  const [postType, setPostType] = React.useState<PostType>(PostType.NonAnoymous)
  const [selfPostSwitch, setSelfPostSwitch] = React.useState<boolean>(false)

  const onSwitchChange = (checked: boolean) => {
    setSelfPostSwitch(checked)
    handleSwitchChange(checked)
  }

  const onSelectChange = (value: PostType) => {
    setPostType(value)
    handleSelectChange(value)
  }

  return (
    <div className="py-2 flex w-full justify-between items-end">
      <Switch
        checked={selfPostSwitch}
        onChange={(e) => onSwitchChange(e.target.checked)}
        label="Own Posts"
        crossOrigin={false}
      />
      <div className="flex items-center justify-center">
        <Select
          variant={'static'}
          value={postType}
          onChange={(e) => onSelectChange(e as PostType)}
          className="max-w-full animate-none"
        >
          <Option value={PostType.All}>All</Option>
          <Option value={PostType.NonAnoymous}>Non Anonymous</Option>
          <Option value={PostType.Annoymous}>Anonymous</Option>
        </Select>
      </div>
    </div>
  )
}

export default Filters
