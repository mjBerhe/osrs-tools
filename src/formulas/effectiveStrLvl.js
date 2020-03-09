export function calcEffectiveStrLvl(userStats) {
	let effectiveLvl = 0;

	// Has Strength lvl been inputted? If so, set effective level to it
	userStats.strengthLvl ? effectiveLvl += userStats.strengthLvl : effectiveLvl += null;

	// Has a Strength potion been selected? If so, adjust effective level depending on potion
	if (userStats.strPotion) {
		if (userStats.strPotion === 1) {
			effectiveLvl += Math.floor(effectiveLvl*0.1 + 3);
		} else if (userStats.strPotion === 2 || userStats.strPotion === 3) {
			effectiveLvl += Math.floor(effectiveLvl*0.15 + 5);
		}
	}

	// Has a Strength prayer been selected? If so, adjust effective level depending on prayer
	userStats.strPrayer ? effectiveLvl = Math.floor(effectiveLvl*userStats.strPrayer) : effectiveLvl += null;

		// Has an attack style been selected? If so, adjust effective level depending on attack style			
	if (userStats.attStyle) {
		if (userStats.attStyle === 'aggressive') {
			effectiveLvl += 3;
		} else if (userStats.attStyle === 'controlled') {
			effectiveLvl += 1;
		}
	}

	effectiveLvl += 8;

	return effectiveLvl;
}