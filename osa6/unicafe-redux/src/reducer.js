const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const updatedGood = state.good + 1  
      const goodState = {
      ...state,
      good: updatedGood
      }
      return goodState
    case 'OK':
      const updatedOk = state.ok + 1  
      const okState = {
      ...state,
      ok: updatedOk
      }
      return okState
    case 'BAD':
      const updatedBad = state.bad + 1  
      const badState = {
      ...state,
      bad: updatedBad
      }
      return badState
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer