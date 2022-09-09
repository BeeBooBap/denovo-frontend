import { useEffect } from 'react'
import { useCasesContext } from '../../hooks/useCasesContext'

// components
import CaseDetails from '../../components/CaseDetails/CaseDetails'

// styling
import './ViewAllCases.css'

const Home = () => {
    const {cases, dispatch} = useCasesContext()

    // retrieving cases 
    useEffect(() => {
        const fetchCases = async () => {
            const response = await fetch('https://denovo-cms.herokuapp.com/api/cases')
            const json = await response.json()

            if (response.ok) {
                dispatch({
                    type: 'SET_CASES',
                    payload: json
                })
            }
            else {
                console.log('Data not fetched')
            }
        }

        fetchCases()
    }, [dispatch])

    return (
        <div className ='view-all-cases'>
            <div className='cases'>

                {cases && cases.map((matter) => (
                    <CaseDetails key={matter._id} matter={matter} />
                ))}
            </div>
        </div>
    )
}

export default Home