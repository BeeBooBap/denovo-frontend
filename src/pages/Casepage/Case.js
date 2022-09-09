import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Case.css'
import Predictor from '../../components/Predictor/Predictor'

const Case = () => {

    let { handle } = useParams()

    const [matter, setMatter] = useState('')

    // importing data from resources
    const {
        issueKey
    } = require('../../resources/DropdownKey')

    // retrieving single case
    useEffect(() => {
        const fetchCases = async () => {
            const response = await fetch('https://denovo-cms.herokuapp.com/api/cases/' + handle)
            const json = await response.json()

            if (response.ok) {
                setMatter(json)
            }
            else {
                console.log('Data not fetched')
            }
        }

        fetchCases()
    }, [handle, matter])

    return (
        <div className="case">
            <div className='name-predictor'>
                <ul>
                    <li><h2>{matter.caseName}</h2> </li>
                    <li><Predictor value={matter}/></li>
                </ul>
            </div>
            <div className="case-card">
                <ul className='case-card-headers'>
                    <li><h3>Client Name</h3> <p>{matter.partyFirstName + " " + matter.partySecondName}</p></li>
                    <li><h3>Opposing Party</h3> <p>{ 
                    matter.opposingPartyFirstName === '' ? 'N/A': 
                        matter.opposingPartyFirstName + " " + matter.opposingPartySecondName}</p></li>
                    <li><h3>Issue</h3>
                        <p>{issueKey.map((num) => { if (matter.issue === num.key) {return <p>{num.value}</p> }
                        else {
                            return <p></p>
                        }
                        })}</p>
                    </li>
                    <li><h3>Prediction</h3>
                        <p>{ ((matter.partyWinning === undefined) || (matter.partyWinning[0] === '')) ? '' : matter.partyWinning[0][0] + ": " + matter.partyWinning[0][1]}</p>
                        <p>{ ((matter.partyWinning === undefined) || ( matter.partyWinning[0] === '')) ? '' : matter.partyWinning[1][0] + ": " + matter.partyWinning[1][1]}</p>
                        <p>{ ((matter.partyWinning === undefined) || ( matter.partyWinning[0] === '')) ? '' : matter.partyWinning[2][0] + ": " + matter.partyWinning[2][1]}</p>
                    </li>
                    <li><h3>Date matter created</h3> <p>{matter.createdAt}</p></li>
                </ul>
                </div>
        </div>
        

    )
}

export default Case