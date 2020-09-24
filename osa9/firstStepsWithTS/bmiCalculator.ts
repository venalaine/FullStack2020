type Result = string;

export const calculateBMI = (height: number, weight: number): Result => {
    const bmi = weight / ((height / 100) * 2);

    if (bmi < 15) {
        return 'Very severely underweight';
    } else if (bmi >= 15 && bmi < 16) {
        return 'Severely underweight';
    } else if (bmi >= 16 && bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    } else if (bmi >= 30 && bmi < 35) {
        return 'Obese Class I (Moderately obese)';
    } else if (bmi >= 35 && bmi < 40) {
        return 'Obese Class II (Severely obese)';
    } else if (bmi >= 40) {
        return 'Obese Class III (Very severely obese)';
    } else {
        throw new Error('Malformatted parameters');
    }
}

try {
    if (process.argv[4]) {
        throw new Error('Too many arguments!');
    }
    const a: number = Number(process.argv[2]);
    const b: number = Number(process.argv[3]);
    console.log(calculateBMI(a, b));
} catch (e) {
    console.log('Error:', e.message);
}