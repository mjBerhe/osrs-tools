export function calcEffectiveMonsterLvl(currentMonster) {
	let effectiveLvl = 0;

	currentMonster ? effectiveLvl += currentMonster.stats.defLvl : effectiveLvl += null;

	effectiveLvl += 9;

	return effectiveLvl;
}