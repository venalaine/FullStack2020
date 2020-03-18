import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const list = [good, neutral, bad]


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
            <Button onClick={handleGoodClick} name='Good' />
            <Button onClick={handleNeutralClick} name='Neutral' />
            <Button onClick={handleBadClick} name='Bad' />
            <Header title='Statistics' />
            <Statistics list={list} />
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

const Statistics = ({ list }) => {
    const all = list[0] + list[1] + list[2]

    let average = (list[0] * 1 + list[1] * 0 + list[2] * -1) / all
    if (all === 0) {
        average = 'Nothing to compute'
    }

    let positive = list[0] / all
    if (all === 0) {
        positive = 'No values typed'
    }

    if (all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    } else {

        return (
            <table>
                <tbody>
                <tr>
                    <td>Good</td>
                    <td>{list[0]}</td>
                </tr>
                <tr>
                    <td>Neutral</td>
                    <td>{list[1]}</td>
                </tr>
                <tr>
                    <td>Bad</td>
                    <td>{list[2]}</td>
                </tr>
                <tr>
                    <td>Average</td>
                    <td>{average}</td>
                </tr>
                <tr>
                    <td>Positive</td>
                    <td>{positive} %</td>
                </tr>
                </tbody>
            </table>
        )
    }

}

ReactDOM.render(<App />,
    document.getElementById('root')
)