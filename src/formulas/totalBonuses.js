export function calcTotalBonuses(equippedGear) {
	// creating array of every equipment type name (helm, body, legs, etc..)
	const equipmentTypeList = Object.getOwnPropertyNames(equippedGear);

	// using reduce to find the total sum of each type of bonus (stab att, slash att, melee str, etc..)
	let stabAttBonus = equipmentTypeList.map((equipment) => equippedGear[equipment] ? equippedGear[equipment].stats.attStab : null)
		.reduce((acc, curVal) => {
			return acc + curVal;
		});
	let slashAttBonus = equipmentTypeList.map((equipment) => equippedGear[equipment] ? equippedGear[equipment].stats.attSlash : null)
		.reduce((acc, curVal) => {
			return acc + curVal
		});
	let crushAttBonus = equipmentTypeList.map((equipment) => equippedGear[equipment] ? equippedGear[equipment].stats.attCrush : null)
		.reduce((acc, curVal) => {
			return acc + curVal
		});
	let magicAttBonus = equipmentTypeList.map((equipment) => equippedGear[equipment] ? equippedGear[equipment].stats.attMagic : null)
		.reduce((acc, curVal) => {
			return acc + curVal;
		});
	let rangeAttBonus = equipmentTypeList.map((equipment) => equippedGear[equipment] ? equippedGear[equipment].stats.attRanged : null)
		.reduce((acc, curVal) => {
			return acc + curVal;
		});
	let meleeStrBonus = equipmentTypeList.map((equipment) => equippedGear[equipment] ? equippedGear[equipment].stats.strBonus : null)
		.reduce((acc, curVal) => {
			return acc + curVal;
		});
	let rangeStrBonus = equipmentTypeList.map((equipment) => equippedGear[equipment] ? equippedGear[equipment].stats.rngStrBonus : null)
		.reduce((acc, curVal) => {
			return acc + curVal;
		});

	return {
		totalStabAttBonus: stabAttBonus,
		totalSlashAttBonus: slashAttBonus,
		totalCrushAttBonus: crushAttBonus,
		totalMagicAttBonus: magicAttBonus,
		totalRangeAttBonus: rangeAttBonus,
		totalMeleeStrBonus: meleeStrBonus,
		totalRangeStrBonus: rangeStrBonus,
	}

}