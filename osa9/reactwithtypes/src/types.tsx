// new types
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartBaseExtended extends CoursePartBase {
    description: string;
}

export interface CoursePartOne extends CoursePartBaseExtended {
    name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBaseExtended {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartBaseExtended {
    name: "My own thing";
    contributors: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

