import { AutoComplete, Empty, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useSearch } from 'entities/task'

export const SearchField = () => {
  const navigate = useNavigate()
  const { data, handleSearch, searchTerm } = useSearch()
  return (
    <AutoComplete
      options={data}
      notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      onSearch={(e) => handleSearch(e)}
      onSelect={(value) => navigate(`/task/${value}`)}
    >
      <Input.Search placeholder="Search..." value={searchTerm} />
    </AutoComplete>
  )
}
