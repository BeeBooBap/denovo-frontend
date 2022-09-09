import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo1 from '../../resources/logo1.png'
import './NavBar.css'
import SearchBar from 'material-ui-search-bar'

const Navbar = () => {

    const [query, setQuery] = useState('')

    const handleSearch = () => {
        console.log(query)
    }

    return (
        <header>
            <div className='nav'>
                <ul className='navbar-items'>
                    <li className='logo-to-home'>
                        <Link to="/">
                            <img src={logo1} alt="logo" className='logo'/>
                        </Link>
                    </li>
                    <li className='active'>
                        <Link to="/">
                            <h2>Dashboard</h2>
                        </Link>
                    </li>
                    <li className='view-all'>
                        <Link to="/view-all">
                            <h2>View All Cases</h2>
                        </Link>
                    </li>
                    <li className='add-new-matter'>
                        <Link to="/new-matter">
                            <h2>Add New Matter</h2>
                        </Link>
                    </li>
                    <li className='search'>
                    <SearchBar
                        onChange={(e) => {setQuery(e)}}
                        onRequestSearch={() => handleSearch()}
                        />
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar