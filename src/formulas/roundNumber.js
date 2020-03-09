export function roundNumber(num, decimal) {
	let roundedNum = num*(Math.pow(10, decimal));
	roundedNum = Math.round(roundedNum);
	roundedNum = roundedNum/Math.pow(10, decimal);

	return roundedNum;
}