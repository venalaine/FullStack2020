import React from "react";

const Content: React.FC<{ courseParts: Array<{ name: string; exerciseCount: number }> } > = ( {courseParts} ) => {

    return (
        <div>
          {courseParts.map(p => <p key={p.name}>{p.name} {p.exerciseCount}</p>)}
        </div>
    )
};

export default Content;