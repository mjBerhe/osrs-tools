export function calcEffectiveAttLvl(userStats) {
	let effectiveLvl = 0;

	// Has Attack lvl been inputted? If so, set effective lvl to it
	userStats.attackLvl ? effectiveLvl += userStats.attackLvl : effectiveLvl += null; 

	// Has an attack potion been selected? If so, adjust effective lvl accordingly
	if (userStats.attPotion) {
		if (userStats.attPotion === 1) {
			effectiveLvl += Math.floor(effectiveLvl*0.1 + 3)
		} else if (userStats.attPotion === 2 || userStats.attPotion === 3) {
			effectiveLvl += Math.floor(effectiveLvl*0.15 + 5)
		}
	}

	// Has an attack prayer been selected? If so, adjust effective lvl accordingly
	userStats.attPrayer ? effectiveLvl = Math.floor(effectiveLvl*userStats.attPrayer) : effectiveLvl += null;

	// Has an attack style been selected? If so, adjust effective level depending on attack style			
	if (userStats.attStyle) {
		if (userStats.attStyle === 'accurate') {
			effectiveLvl += 3;
		} else if (userStats.attStyle === 'controlled') {
			effectiveLvl += 1;
		}
	}

	effectiveLvl += 8;

	return effectiveLvl;
}