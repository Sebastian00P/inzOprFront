import { FormEventHandler, useCallback, useState } from "react";

export interface ISearchBar {
    onSearch: (query: string) => void
}

const SearchBar: React.FC<ISearchBar> = (
    { onSearch }: ISearchBar
) => {
    const [query, setQuery] = useState("")

    const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }, [query])

    const handleSubmit = useCallback(() => {
        onSearch(query)
    }, [query, onSearch])

    return (
        <>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative flex flex-row border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <input
                    value={query}
                    onChange={handleQueryChange}
                    type="text"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 bg-gray-50 focus:outline-none"
                    placeholder="Search books..."
                    required
                />

                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="bg-purple-300 hover:bg-purple-400 rounded-lg text-sm m-2 p-2">Search</button>
            </div>
        </>
    );
}

export default SearchBar;
