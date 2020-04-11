import React from 'react'

const Notification = ({ message }) => {

    const nofitifationStyle = {
            color: 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,       
    }

    if (message === null) {
        return null
    }

    return (
        <div className="error" style={nofitifationStyle}>
            {message}
        </div>
    )
}

export default Notification