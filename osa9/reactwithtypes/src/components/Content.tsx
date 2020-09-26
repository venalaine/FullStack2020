import React from "react";
import Part from './Part';
import { CoursePart } from '../types';

const Content: React.FC< { courseParts: Array<CoursePart> }> = ( { courseParts } ) => {

    return (
        <div>
         {courseParts.map(p => <Part key={p.name} part={p}/>)}
        </div>
    )
};

export default Content;