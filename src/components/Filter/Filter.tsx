import React, { useState } from 'react'
import s from "./Filter.module.scss"
interface FilterProps {
    onFilter: (term: string) => void
}
const Filter: React.FC <FilterProps> = ({onFilter}) => {
    const [term, setTerm] = useState('')
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTerm(value)
        onFilter(value)
    }
  return (
    <div className={s.filter}>
      <input
        type="text"
        value={term}
        onChange={handleFilterChange}
        placeholder="Поиск по имени..."
        className={s.input}
      />
    </div>
  )
}

export default Filter