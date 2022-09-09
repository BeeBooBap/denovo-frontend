import { useCasesContext } from '../../hooks/useCasesContext'
import { RiDeleteBin6Line } from 'react-icons/ri'
import './CaseDetails.css'

const CaseDetails = ({ matter }) => {

  // importing data from resources
  const {
    issueKey
} = require('../../resources/DropdownKey')


const highestPercentage = (p) => {
  const one = parseFloat(p[0][1])
  const two = parseFloat(p[1][1])
  const three = parseFloat(p[2][1])

    if (one > two && one > three) {
      return p[0][0] + " outcome"
    }
    else if (two > one && two > three) {
      return p[1][0] + " outcome"
    }
    else return p[2][0] + " outcome"
}

  const { dispatch } = useCasesContext()

  const handleClick = async () => {
    const response = await fetch('https://denovo-cms.herokuapp.com/api/cases/' + matter._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({
        type: 'DELETE_MATTER',
        payload: json
      })
    }
  }

    return (
      <div className='link-to-matter'>
        <a href={`/${matter._id}`}>
        <div className='caseDetails'>
          <h4>{matter.caseName}</h4>
          <p><b>Name: </b>{matter.partySecondName}</p>
          <p><b>Issue: </b>{issueKey.map((num) => { if (matter.issue === num.key) {return <p>{num.value}</p> }
                        else {
                            return <p></p>
                        }
                        })}</p>
          <p><b>Prediction: </b>{matter.partyWinning[0] === (undefined || '') ? '' : highestPercentage(matter.partyWinning) }</p>
          <span onClick={handleClick}><RiDeleteBin6Line size={25}/></span>
        </div>
        </a>
      </div>
    )
}

export default CaseDetails