import { useState } from 'react'

// styling
import './CaseForm.css'

const CaseForm = () => {

    // importing data from resources
    const {
        caseOriginKey,
        respondentKey,
        issueKey
    } = require('../../resources/DropdownKey')

    const [uniqueID, setUniqueID] = useState('')
    const [caseName, setCaseName] = useState('')
    const [partyFirstName, setPartyFirstName] = useState('')
    const [partySecondName, setPartySecondName] = useState('')
    const [opposingPartyFirstName, setOpposingPartyFirstName] = useState('')
    const [opposingPartySecondName, setOpposingPartySecondName] = useState('')
    const [issue, setIssue] = useState('')
    const [caseOrigin, setCaseOrigin] = useState('')
    const [dateDecision, setDateDecision] = useState('')
    const [term, setTerm] = useState('')
    const [respondent, setRespondent] = useState('')
    const [partyWinning, setPartyWinning] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const getEmptyFields = (fields, length) => {
        let values = ''
        if (length < fields.length) {return fields}
        else {
            for (let i = 0; i < length; i++) {

                if (i === length -1) { values += fields[i]}
                else {values += fields[i] + ', '}
            }
        }
        return values
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const matter = {uniqueID, caseName, partyFirstName, partySecondName,
            opposingPartyFirstName, opposingPartySecondName, issue,
            caseOrigin, dateDecision, term, respondent, partyWinning}

        // fetch request to POST new data
        const response = await fetch('https://denovo-cms.herokuapp.com/api/cases', {
            method: 'POST',
            body: JSON.stringify(matter),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setUniqueID('')
            setCaseName('')
            setPartyFirstName('')
            setPartySecondName('')
            setOpposingPartyFirstName('')
            setOpposingPartySecondName('')
            setIssue('')
            setCaseOrigin('')
            setDateDecision('')
            setTerm('')
            setRespondent('')
            setPartyWinning('')
            setError(null)
            setEmptyFields([])
            console.log('New matter added', json)
        }
    } 

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Matter</h3>

            <label>Firm Ref: </label>
            <input
                type="text"
                onChange={(e) => setUniqueID(e.target.value)}
                value={uniqueID}
                className={emptyFields.includes('caseName') ? 'error' : ''}
            />

            <label>Matter Name: </label>
            <input
                type="text"
                onChange={(e) => setCaseName(e.target.value)}
                value={caseName}
                className={emptyFields.includes('caseName') ? 'error' : ''}
            />

            <label>Party First Name: </label>
            <input
                type="text"
                onChange={(e) => setPartyFirstName(e.target.value)}
                value={partyFirstName}
                className={emptyFields.includes('partyFirstName') ? 'error' : ''}
            />

            <label>Party Second Name: </label>
            <input
                type="text"
                onChange={(e) => setPartySecondName(e.target.value)}
                value={partySecondName}
                className={emptyFields.includes('partySecondName') ? 'error' : ''}
            />

            <label>Opposing Party First Name: </label>
            <input
                type="text"
                onChange={(e) => setOpposingPartyFirstName(e.target.value)}
                value={opposingPartyFirstName}
            />

            <label>Opposing Party Second Name: </label>
            <input
                type="text"
                onChange={(e) => setOpposingPartySecondName(e.target.value)}
                value={opposingPartySecondName}
            />

            <label>Issue: </label>
            <select 
            className='dropdown'
            onChange={(e) => setIssue(e.target.value)}>
                {issueKey.map((num) => {
                    return <option value={num.key}>{num.value}</option>
                })}
            </select>

            <label>Term of the Court (YYYY): </label>
            <input
                type="text"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
            />

            <label >Respondent: </label>
            <select 
            className='dropdown'
            onChange={(e) => setRespondent(e.target.value)}>
                {respondentKey.map((num) => {
                    return <option value={num.key}>{num.value}</option>
                })}
            </select>

            <label >Case Origin: </label>
            <select 
            className='dropdown'
            onChange={(e) => setCaseOrigin(e.target.value)}>
                {caseOriginKey.map((num) => {
                    return <option value={num.key}>{num.value}</option>
                })}
            </select>
            

            <button>Add Matter</button>
            {error && <div className="error">{error + ": " + getEmptyFields(emptyFields, emptyFields.length)}</div>}
        </form>
    )
}

export default CaseForm