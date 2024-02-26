interface SearchInputProps{
  value: string
  setValue: (value: string) => void
}

function SearchInput({ value, setValue }: SearchInputProps) { 

  return (
    <input 
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className='
        flex 
        w-full 
        rounded-md 
        bg-neutral-700
        border
        border-transparent
        px-3 
        py-3 
        text-sm                 
        placeholder:text-neutral-400 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        focus:outline-none
      '
    />
  )
}

export default SearchInput