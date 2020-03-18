import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <Header title='Give Feedback' />
            <Button onClick={handleGoodClick} name='Good'/>
            <Button onClick={handleNeutralClick} name='Neutral'/>
            <Button onClick={handleBadClick} name='Bad'/>
            <Header title='Statistics' />
            <Statistics />
        </div>
    )
}

const Button = ({ onClick, name }) => {
    return (
        <button onClick={onClick}>
            {name}
        </button>
    )
}

const Header = ({ title }) => {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

const Statistics = ({ name }) => {
    return (
        <div>
            <p>Good</p>
            <p>Neutral</p>
            <p>Bad</p>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)