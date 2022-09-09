import './SearchAllCases.css'
import { BsSearch } from 'react-icons/bs'
import { useEffect, useState } from 'react'

const SearchBar = (props) => {

    const [query, setQuery] = useState('')
    const [data, setData] = useState('')

    useEffect(() => {
        setData(props.search)
    }, [props.search])

    const handleSearch = () => {
        data.filter((c) => c.name === query)
        console.log("this is handle search input ", query)
        return data
    }

    return (
        <div className='searchBar'>
            <div className='searchIconCont'>
            <button className='searchButton' onClick={handleSearch}>
                <BsSearch size={20} color='white'/>
            </button>
            </div>
            <input 
            className='searchInput'
            type="text"  
            onChange={e => setQuery(e.target.value)} 
            placeholder="Enter case name to search..." />
        </div>
    )
}

export default SearchBar