import React, { useState, useEffect, useCallback } from 'react';
import { calcEffectiveStrLvl } from './formulas/effectiveStrLvl';
import { calcEffectiveAttLvl } from './formulas/effectiveAttLvl';
import { calcEffectiveMonsterLvl } from './formulas/effectiveMonsterLvl';
import { calcHitChance } from './formulas/accuracy';
import { calcTotalBonuses } from './formulas/totalBonuses';
import { roundNumber } from './formulas/roundNumber';
import { LvlInputs }  from './dpsComponents/LvlInputs';
import { OutputComparison } from './dpsComponents/OutputComparison';
import { SelectMonster } from './dpsComponents/SelectMonster';
import { StatBoosters } from './dpsComponents/StatBoosters';
import { SelectWeapon } from './dpsComponents/SelectEquipment/SelectWeapon';
import { SelectHelm } from './dpsComponents/SelectEquipment/SelectHelm';
import { SelectShield } from './dpsComponents/SelectEquipment/SelectShield';
import { SelectBody } from './dpsComponents/SelectEquipment/SelectBody';
import { SelectLeg } from './dpsComponents/SelectEquipment/SelectLeg';
import { SelectBoot } from './dpsComponents/SelectEquipment/SelectBoot';
import { SelectCape } from './dpsComponents/SelectEquipment/SelectCape';
import { SelectGlove } from './dpsComponents/SelectEquipment/SelectGlove';
import { SelectNeck } from './dpsComponents/SelectEquipment/SelectNeck';
import { SelectRing } from './dpsComponents/SelectEquipment/SelectRing';
import { SelectAmmo } from './dpsComponents/SelectEquipment/SelectAmmo';
const fetch = require('node-fetch');

function DpsTool() {

	// equipmentAPI is an array of routes for each piece of equipement and monsters
	const equipmentAPI = [
		'/api/weapons',
		'/api/shields',
		'/api/helmets',
		'/api/chests',
		'/api/legs',
		'/api/boots',
		'/api/capes',
		'/api/gloves',
		'/api/necklaces',
		'/api/rings',
		'/api/ammos',
		'/api/monsters',
	];

	// equipmentList is an object where each property represents an equipment piece
	// corresponding value is an array of objects that contains every single corresponding equipment piece in the game
	const [equipmentList, setEquipmentList] = useState({
		weapon: null,
		shield: null,
		helm: null,
		body: null,
		leg: null,
		boot: null,
		cape: null,
		glove: null,
		neck: null,
		ring: null,
		ammo: null,
	});

	// equippedGear & equippedGear2 are objects that will contain the CURRENTLY equipped item(object) for each slot
	const [equippedGear, setEquippedGear] = useState({
		weapon: null,
		shield: null,
		helm: null,
		body: null,
		leg: null,
		boot: null,
		cape: null,
		glove: null,
		neck: null,
		ring: null,
		ammo: null,
	});

	const [equippedGear2, setEquippedGear2] = useState({
		weapon: null,
		shield: null,
		helm: null,
		body: null,
		leg: null,
		boot: null,
		cape: null,
		glove: null,
		neck: null,
		ring: null,
		ammo: null,
	});

	// monstersList is an array of objects where each object represents a monster
	const [monstersList, setMonstersList] = useState(null);

	// currentMonster is the object that represents the currently selected monster
	const [currentMonster, setCurrentMonster] = useState(null);

	// userStats & userStats2 contains the current useful stats of the player for future DPS calculations
	const [userStats, setUserStats] = useState({
		attackLvl: '',
		strengthLvl: '',
		rangeLvl: '',
		equipmentAttBonus: {
			stab: null,
			slash: null,
			crush: null,
			magic: null,
			range: null,
		},
		equipmentMeleeStrBonus: null,
		equipmentRangeStrBonus: null,
		strPotion: 0,
		strPrayer: 0,
		strPrayerNumber: 0,
		attPotion: 0,
		attPrayer: 0,
		attPrayerNumber: 0,
		chosenAttType: null,
		attStyle: null,
	});

	const [userStats2, setUserStats2] = useState({
		attackLvl: '',
		strengthLvl: '',
		rangeLvl: '',
		equipmentAttBonus: {
			stab: null,
			slash: null,
			crush: null,
			magic: null,
			range: null,
		},
		equipmentMeleeStrBonus: null,
		equipmentRangeStrBonus: null,
		strPotion: 0,
		strPrayer: 0,
		strPrayerNumber: 0,
		attPotion: 0,
		attPrayer: 0,
		attPrayerNumber: 0,
		chosenAttType: null,
		attStyle: null,
	});

	// finalOutput & finalOutput2 contains useful information for calculating DPS
	const [finalOutput, setFinalOutput] = useState({
		maxHit: null,
		accuracy: null,
	});

	const [finalOutput2, setFinalOutput2] = useState({
		maxHit: null,
		accuracy: null,
	});

	// dps & dps2 contains the final dps 
	const [dps, setDps] = useState(null);

	const [dps2, setDps2] = useState(null);

	// for the initial fetch of all equipment lists and monster list
	// WOULD LIKE TO DO SOMETHING ABOUT THE LOADING TIME
	// NEED TO HAVE A CATCH ERROR AS I RANDOMELY GET ERRORS AT POSITION 0?
	useEffect(() => {
		async function fetchData() {
			await Promise.all(equipmentAPI.map(equipment => fetch(equipment)))
				.then(responses => Promise.all(responses.map(response => response.json())))
				.then(lists => {
					setEquipmentList({
						weapon: lists[0],
						shield: lists[1],
						helm: lists[2],
						body: lists[3],
						leg: lists[4],
						boot: lists[5],
						cape: lists[6],
						glove: lists[7],
						neck: lists[8],
						ring: lists[9],
						ammo: lists[10],
					})
					setMonstersList(lists[11])
				})
		}
		fetchData();
	}, []);

	// for updating userStats everytime there is an equipment change (equippedGear)
	// refer to ./formulas/totalBonuses for the function
	useEffect(() => {
		// for set 1
		const totalBonusObject = calcTotalBonuses(equippedGear);			

		setUserStats((userStats) => ({
			...userStats,
			equipmentAttBonus: {
				stab: totalBonusObject.totalStabAttBonus,
				slash: totalBonusObject.totalSlashAttBonus,
				crush: totalBonusObject.totalCrushAttBonus,
				magic: totalBonusObject.totalMagicAttBonus,
				range: totalBonusObject.totalRangeAttBonus,
			},
			equipmentMeleeStrBonus: totalBonusObject.totalMeleeStrBonus,
			equipmentRangeStrBonus: totalBonusObject.totalRangeStrBonus,
		}));

		// for set 2
		const totalBonusObject2 = calcTotalBonuses(equippedGear2);			

		setUserStats2((userStats2) => ({
			...userStats2,
			equipmentAttBonus: {
				stab: totalBonusObject2.totalStabAttBonus,
				slash: totalBonusObject2.totalSlashAttBonus,
				crush: totalBonusObject2.totalCrushAttBonus,
				magic: totalBonusObject2.totalMagicAttBonus,
				range: totalBonusObject2.totalRangeAttBonus,
			},
			equipmentMeleeStrBonus: totalBonusObject2.totalMeleeStrBonus,
			equipmentRangeStrBonus: totalBonusObject2.totalRangeStrBonus,
		}));

	}, [equippedGear, equippedGear2])

	// for updating finalOutput everytime there is a change in userStats or currentMonster
	// calls multiple formulas from ./formulas
	useEffect(() => {
		const effectiveMonsterLvl = calcEffectiveMonsterLvl(currentMonster);

		// for set 1
		const effectiveStrLvl = calcEffectiveStrLvl(userStats);
		const effectiveAttLvl = calcEffectiveAttLvl(userStats);

		const maxHit = Math.floor((((effectiveStrLvl)*(userStats.equipmentMeleeStrBonus + 64)) / 640) + 0.5);
		const maxAttRoll = Math.floor(effectiveAttLvl*(userStats.equipmentAttBonus[userStats.chosenAttType] + 64));
		const maxDefRoll = currentMonster ? Math.floor(effectiveMonsterLvl*(currentMonster.stats.defences[userStats.chosenAttType] + 64)) : null;
		
		const accuracy = calcHitChance(maxAttRoll, maxDefRoll);

		setFinalOutput((finalOutput) => ({
			...finalOutput,
			maxHit: maxHit,
			accuracy: accuracy,
		}));

		// for set 2
		const effectiveStrLvl2 = calcEffectiveStrLvl(userStats2);
		const effectiveAttLvl2 = calcEffectiveAttLvl(userStats2);

		const maxHit2 = Math.floor((((effectiveStrLvl2)*(userStats2.equipmentMeleeStrBonus + 64)) / 640) + 0.5);
		const maxAttRoll2 = Math.floor(effectiveAttLvl2*(userStats2.equipmentAttBonus[userStats2.chosenAttType] + 64));
		const maxDefRoll2 = currentMonster ? Math.floor(effectiveMonsterLvl*(currentMonster.stats.defences[userStats2.chosenAttType] + 64)) : null;
		
		const accuracy2 = calcHitChance(maxAttRoll2, maxDefRoll2);

		setFinalOutput2((finalOutput2) => ({
			...finalOutput2,
			maxHit: maxHit2,
			accuracy: accuracy2,
		}));

	}, [userStats, userStats2, currentMonster])


	// for updating dps whenever there is a change in finalOutput
	useEffect(() => {
		// for set 1
		const maxHit = finalOutput.maxHit;
		const attSpeed = equippedGear.weapon ? equippedGear.weapon.attSpeed : null;
		const accuracy = finalOutput.accuracy;

		const dps = (accuracy * (maxHit/2)) / (attSpeed*0.6);

		setDps(dps);

		// for set 2
		const maxHit2 = finalOutput2.maxHit;
		const attSpeed2 = equippedGear2.weapon ? equippedGear2.weapon.attSpeed : null;
		const accuracy2 = finalOutput2.accuracy;

		const dps2 = (accuracy2 * (maxHit2/2)) / (attSpeed2*0.6);

		setDps2(dps2);

	}, [finalOutput, finalOutput2])

	// event handler for Lvl inputs and prayer changes
	// updating userStats whenever called
	// WOULD LIKE TO CLEAN THIS UP LATER
	const handleStatsChange = useCallback((e) => {
		e.persist();
		console.log(e.target.value)

		if (e.target.name === 'attPrayer') {
			let attPrayerNumber;
			switch (parseFloat(e.target.value, 10)) {
				case 1.05:
					attPrayerNumber = 1;
					break;
				case 1.1:
					attPrayerNumber = 2;
					break;
				case 1.15:
					attPrayerNumber = 3;
					break;
				case 1.150000000001:
					attPrayerNumber = 4;
					break;
				case 1.2:
					attPrayerNumber = 5;
					break;
				default:
					attPrayerNumber = 0;
			}
			setUserStats(prevStats => ({
				...prevStats,
				...prevStats.equipmentAttBonus,
				attPrayerNumber: attPrayerNumber,
			}));
			setUserStats2(prevStats => ({
				...prevStats,
				...prevStats.equipmentAttBonus,
				attPrayerNumber: attPrayerNumber,
			}));

		} else if (e.target.name === "strPrayer") {
			let strPrayerNumber;
			switch (parseFloat(e.target.value, 10)) {
				case 1.05:
					strPrayerNumber = 1;
					break;
				case 1.1:
					strPrayerNumber = 2;
					break;
				case 1.15:
					strPrayerNumber = 3;
					break;
				case 1.18:
					strPrayerNumber = 4;
					break;
				case 1.23:
					strPrayerNumber = 5;
					break;
				default:
					strPrayerNumber = 0;
			}
			setUserStats(prevStats => ({
				...prevStats,
				...prevStats.equipmentAttBonus,
				strPrayerNumber: strPrayerNumber,
			}));
			setUserStats2(prevStats => ({
				...prevStats,
				...prevStats.equipmentAttBonus,
				strPrayerNumber: strPrayerNumber,
			}));		
		}

		setUserStats(prevStats => ({
			...prevStats,
			...prevStats.equipmentAttBonus,
			[e.target.name]: parseFloat(e.target.value, 10),
		}));
		setUserStats2(prevStats => ({
			...prevStats,
			...prevStats.equipmentAttBonus,
			[e.target.name]: parseFloat(e.target.value, 10),
		}));
	}, [])

	// updates equippedGear whenever a new gear piece is chosen
	// function only renders when equipmentList changes (should only be once)
	const handleEquipmentChange = useCallback((equipType, id) => {
		const itemID = id;
		const equipmentType = equipType;
		equipmentList[equipmentType].forEach((item) => {
			if (item.id == itemID) {
				setEquippedGear((equippedGear) => ({
					...equippedGear,
					[equipmentType]: item,
				}));
			}
		})
	}, [equipmentList])

	const handleEquipmentChange2 = useCallback((equipType, id) => {
		const itemID = id;
		const equipmentType = equipType;
		equipmentList[equipmentType].forEach((item) => {
			if (item.id == itemID) {
				setEquippedGear2((equippedGear2) => ({
					...equippedGear2,
					[equipmentType]: item,
				}));
			}
		})
	}, [equipmentList])

	// updates the users attack style and attack type when a new style is chosen
	// takes something like 'slash-accurate' and splits it up 
	// *DOESN'T RESET WHEN A NEW WEAPON IS EQUIPPED
	const handleStyleChange = useCallback((attStyle) => {
		let style = attStyle.split(' - ')

		setUserStats(prevStats => ({
			...prevStats,
			...prevStats.equipmentAttBonus,
			chosenAttType: style[0],
			attStyle: style[1],
		}))
	}, [])

	const handleStyleChange2 = useCallback((attStyle) => {
		let style = attStyle.split(' - ')

		setUserStats2(prevStats2 => ({
			...prevStats2,
			...prevStats2.equipmentAttBonus,
			chosenAttType: style[0],
			attStyle: style[1],
		}))
	}, [])

	// updates currentMonster whenever a new monster is selected
	// function only renders when monstersList gets updated (should be once)
	const handleMonsterChange = useCallback((monsterID) => {
		monstersList.forEach((monster) => {
			if (monster.id == monsterID) {
				setCurrentMonster(monster);
			}
		})
	}, [monstersList])

	// MAKE CHART LOOK NICER 
	// MAKE OVERALL DESIGN NICER !!!!!!!!!!!!!!

	return (
		<div className="grid-container">
			<div className="title">
				<h1>OSRS DPS Calculator</h1>
				<h3>Melee Only</h3>
			</div>

			<div className="second-row">
				<div className="stat-block">
					<h2 className="stat-title">Stats & Boosts</h2>
					<LvlInputs handleStatsChange={handleStatsChange} userStats={userStats}/>
					<StatBoosters handleStatsChange={handleStatsChange} userStats={userStats}/>
				</div>

				<div className="monster-and-outputs">
					<h2 className="final-title">Armor Set 1 vs Armor Set 2</h2>
					<OutputComparison finalOutput={finalOutput} finalOutput2={finalOutput2} dps={dps} dps2={dps2}/>

					<SelectMonster handleMonsterChange={handleMonsterChange} monstersList={monstersList}/>
					<h4>{/*currentMonster ? `Monster selected: ${currentMonster.name}` : 'Monster not selected' */}</h4>

					<div className="common-stats">
						<h4>{/*userStats ? `Str Bonus: ${userStats.equipmentMeleeStrBonus}` : 'No stats yet' */}</h4>
						<h4>{/*userStats ? `Equipment Att Bonuses: [Stab: ${userStats.equipmentAttBonus.stab}, Slash: ${userStats.equipmentAttBonus.slash}, Crush: ${userStats.equipmentAttBonus.crush}, Range: ${userStats.equipmentAttBonus.range}, Magic: ${userStats.equipmentAttBonus.magic}]` : 'No stats yet' */}</h4>
						<h4>{/*userStats ? `Lvls: [Att: ${userStats.attackLvl}, Str: ${userStats.strengthLvl}]` : 'input ur lvls'*/}</h4>
						<h4>{/*userStats ? `Potions: [Att: ${userStats.attPotion}, Str: ${userStats.strPotion}]` : 'input ur pots'*/}</h4>
						<h4>{/*userStats ? `Prayers: [Att: ${userStats.attPrayer}, Str: ${userStats.strPrayer}]` : 'input ur prayers'*/}</h4>	
					</div>
				</div>
			</div>
			
			<div className="equipment-select">
				<h2 className="armor-set1">Armor Set 1</h2>
				<SelectWeapon handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList} handleStyleChange={handleStyleChange} equippedGear={equippedGear}/>
				<SelectHelm handleEquipmentChange={handleEquipmentChange}  equipmentList={equipmentList}/>
				<SelectShield handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList}/>
				<SelectBody handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList}/>
				<SelectLeg handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList}/>
				<SelectBoot handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList}/>
				<SelectCape handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList}/>
				<SelectGlove handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList}/>
				<SelectNeck handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList}/>
				<SelectAmmo handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList}/>
				<SelectRing handleEquipmentChange={handleEquipmentChange} equipmentList={equipmentList}/>
			</div>

			<div className="equipment-select2">
				<h2 className="armor-set2">Armor Set 2</h2>
				<SelectWeapon handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList} handleStyleChange={handleStyleChange2} equippedGear={equippedGear2}/>
				<SelectHelm handleEquipmentChange={handleEquipmentChange2}  equipmentList={equipmentList}/>
				<SelectShield handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList}/>
				<SelectBody handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList}/>
				<SelectLeg handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList}/>
				<SelectBoot handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList}/>
				<SelectCape handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList}/>
				<SelectGlove handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList}/>
				<SelectNeck handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList}/>
				<SelectAmmo handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList}/>
				<SelectRing handleEquipmentChange={handleEquipmentChange2} equipmentList={equipmentList}/>
			</div>	
		</div>
	)
}

export default DpsTool;

