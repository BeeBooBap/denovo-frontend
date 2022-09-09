import { useEffect, useState } from 'react'
import './Predictor.css'

const Predictor = (props) => {

  const [data, setData] = useState('')

  useEffect( () => {
    setData(props.value)
  }, [props.value])

  const handleClick = async () => {

    const prediction_response = await fetch('https://denovo-bbk-project.herokuapp.com/predict', {
      method: 'POST',
      body: JSON.stringify(
        {
          "dateDecision": 2519, // - latest date encoded from model
          "term": data.term,
          "respondent": data.respondent,
          "caseOrigin": data.caseOrigin,
          "issue": data.issue
        }
      ),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (prediction_response.ok) {
      const prediction_json = await prediction_response.json()
      const prediction_arr = Object.entries(prediction_json)

      const response = await fetch('https://denovo-cms.herokuapp.com/api/cases/' + data._id, {
        method: 'PATCH',
        body: JSON.stringify({'partyWinning': prediction_arr}),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const json = await response.json()
  
      if (response.ok) {
        console.log("Matter updated", json)
    }
  }
}

    return (
        <div className='predict'>
            <button className= 'predict-button' onClick={ handleClick }>Make prediction</button>
        </div>
    )
}

export default Predictor