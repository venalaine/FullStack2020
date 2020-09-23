interface TrainingResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (data: Array<number>, target: number): TrainingResults => {
    let avg: number = null;
    let rating: number = null;

    const calcAvg = (): number => {
        let sum: number = null;
        
        for (let i = 0; i < data.length; i++) {
            sum = sum + data[i];
        }
        avg = sum / data.length;

        return sum / data.length;
    }

    const calcRating = (): number => {
        if (avg < target) {
            rating = 1;
            return 1
        } else if (avg >= target && avg <= (1.2 * target)) {
            rating = 2;
            return 2
        } else {
            rating = 3;
            return 3
        }
    }

    const handleDescription = (): string => {
        switch (rating) {
            case 1:
                return 'under target'
            case 2:
                return 'target achieved'
            case 3:
                return 'excellent'
        }
    }

    if (data.length !== 0 && !isNaN(target)) {
        return {
            periodLength: data.length,
            trainingDays: data.filter(d => d !== 0).length,
            success: avg >= target,
            rating: calcRating(),
            ratingDescription: handleDescription(),
            target: target,
            average: calcAvg(),
        }
    }
}

try {
    if (!process.argv[3]) {
        throw new Error('Mandatory argument missing!');
    }

    for (let i = 2; i < process.argv.length; i++) {
        if (isNaN(Number(process.argv[i]))) {
            throw new Error('Illegal arguments!');
        }
    }

    const a: number = Number(process.argv[2]);
    let b: Array<number> = new Array;

    for (let i = 3; i < process.argv.length; i++) {
        b.push(Number(process.argv[i]));
    }

    console.log(calculateExercises(b, a));

} catch (e) {
    console.log('Error:', e.message);
}


