import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h2>UNICAFE</h2>
      <button className='good-button' onClick={good}>good</button> 
      <button className='ok-button' onClick={ok}>ok</button> 
      <button className='bad-button' onClick={bad}>bad</button>
      <button className='reset-button' onClick={reset}>reset stats</button>
      <p>good {store.getState().good}</p>
      <p>ok {store.getState().ok}</p>
      <p>bad {store.getState().bad}</p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
