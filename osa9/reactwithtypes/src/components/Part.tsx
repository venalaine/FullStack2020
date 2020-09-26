import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <h3>{part.name} </h3>
                    exercises: {part.exerciseCount} <br/>
                    description: {part.description} <br/>
                    <br />
                </div>
            )
        case "Using props to pass data":
            return (
                <div>
                    <h3>{part.name} </h3>
                    exercises: {part.exerciseCount} <br/>
                    group project count: {part.groupProjectCount} <br/>
                    <br />
                </div>
            )
        case "Deeper type usage":
            return (
                <div>
                    <h3>{part.name} </h3>
                    exercises: {part.exerciseCount} <br/>
                    description: {part.description} <br/>
                    submission link: {part.exerciseSubmissionLink} <br/>
                    <br />
                </div>
            )
        case "My own thing":
            return (
                <div>
                    <h3>{part.name} </h3>
                    exercises: {part.exerciseCount} <br/>
                    description: {part.description} <br/>
                    contributors: {part.contributors} <br/>
                    <br />
                </div>
            )

        default:
            return null
    }

};

export default Part;