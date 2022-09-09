import { useEffect, useState } from 'react'
import './Predictor.css'

const Predictor = (props) => {

  const [data, setData] = useState('')
  const [prediction, setPrediction] = useState('')

  useEffect( () => {
    setData(props.value)
  }, [props.value])

  const isEmpty = (p) => {
    return p === ''
  }

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

    const prediction_json = await prediction_response.json()
    const prediction_arr = Object.entries(prediction_json)

    if (prediction_response.ok) {
      setPrediction(prediction_arr)
    }

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

    return (
        <div className='predict'>
            <button className= 'predict-button' onClick={ handleClick }>Make prediction</button>
            <div className='predict-output'>
              { isEmpty(data) ? 'Loading...' : 
                !isEmpty(data.partyWinning[0]) ? (
                  <ul>
                  <li>
                    {'Likelihood of success: ' + data.partyWinning[1][1] }
                  </li>
                  <li>
                    {'Likelihood of failure: ' + data.partyWinning[0][1]}
                  </li>
                  <li>
                    {'Likelihood of an unclear result: ' + data.partyWinning[2][1]}
                  </li>
                </ul>
              ) :
              isEmpty(prediction) ?
                  (
                    'Loading...'
                  ) : (
                    <ul>
                      <li className='text'>
                        {'Likelihood of success: ' + prediction[1][1] }
                      </li>
                      <li className='text'>
                        {'Likelihood of failure: ' + prediction[0][1]}
                      </li>
                      <li className='text'>
                        {'Likelihood of an unclear result: ' + prediction[2][1]}
                      </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Predictor