import React, { useState, useEffect } from 'react';
const fetch = require('node-fetch');

function TestData() {

	// NEED TO ALSO GET MONSTERS IN THE DATABASE

	// equipmentAPI is an array of routes for each piece of equipement
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
	]

	// equipmentList is an array that/will contains the lists of all the different types of equipments as objects
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

	// equippedGear is an object that/will contain the CURRENTLY equipped item(object) for each slot
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

	// monstersList is an array of objects where each object represents a monster
	const [monstersList, setMonstersList] = useState(null);

	// currentMonster is the object that represents the currently selected monster
	const [currentMonster, setCurrentMonster] = useState(null);

	// SITLL IN PROGROSS
	// userStats contains the current useful stats of the player for calculcating DPS
	const [userStats, setUserStats] = useState({
		attackLvl: '',
		strengthLvl: null,
		equipmentStrBonus: null,

	})

	// for the initial fetch of all equipment lists and monster list
	useEffect(() => {
		async function fetchData() {
			const responseAll = await Promise.all(equipmentAPI.map(equipment => fetch(equipment)))
				.then(responses => Promise.all(responses.map(response => response.json())))
				.then(lists => setEquipmentList({
					...equipmentList,
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
				}))
			const response = await fetch('/api/monsters');
			setMonstersList(await response.json());
		}
		fetchData();
	}, []);

	// for updating userStats everytime there is an equipment change
	// would like to have functions for each type of stat
	useEffect(() => {
		function setStrBonus() {
			const equipmentTypeList = Object.getOwnPropertyNames(equippedGear);
			let strBonusArray = equipmentTypeList.map((equipment) => equippedGear[equipment] ? equippedGear[equipment].stats[0].strBonus : null)
				.reduce(
					(acc, curVal) => {
						return acc + curVal
					}
				)
			setUserStats({
				...userStats,
				equipmentStrBonus: strBonusArray,
			});

		}
		setStrBonus();
	}, [equippedGear])


	// handleEquipmentChange runs everytime an option on a gear select bar changes
	// updates equippedGear accordingly
	function handleEquipmentChange(e) {
		const itemID = e.target.value;
		const equipmentType = e.target.name;
		equipmentList[equipmentType].forEach((item) => {
			if (item.id == itemID) {
				setEquippedGear({
					...equippedGear,
					[equipmentType]: item,
				});
			}
		})
	}
	

	// handleMonsterChange runs everytime the user changes which monster they are selecting
	// updates currentMonster
	function handleMonsterChange(e) {
		const monsterID = e.target.value;
		monstersList.forEach((monster) => {
			if (monster.id == monsterID) {
				setCurrentMonster(monster);
			}
		})
	}

	// updating user stats, would like to make an object with each stat as a property
	function handleChange(e) {
		setUserStats({
			...userStats,
			attackLvl: e.target.value,
		});
	}

	// CONTINUE WITH INPUT FIELDS FOR LEVELS & SELECT FOR POTIONS/PRAYERS

	return (
		<div>
			<input type="text" value={userStats.attackLvl} onChange={handleChange}/>

			<select name='weapon' onChange={handleEquipmentChange}>
				{equipmentList.weapon ? equipmentList.weapon.map((weapon, index) => <option key={index} value={weapon.id} name='weapon'>{weapon.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='shield' onChange={handleEquipmentChange}>
				{equipmentList.shield ? equipmentList.shield.map((shield, index) => <option key={index} value={shield.id}>{shield.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='helm' onChange={handleEquipmentChange}>
				{equipmentList.helm ? equipmentList.helm.map((helm, index) => <option key={index} value={helm.id}>{helm.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='body' onChange={handleEquipmentChange}>
				{equipmentList.body ? equipmentList.body.map((body, index) => <option key={index} value={body.id}>{body.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='leg' onChange={handleEquipmentChange}>
				{equipmentList.leg ? equipmentList.leg.map((leg, index) => <option key={index} value={leg.id}>{leg.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='boot' onChange={handleEquipmentChange}>
				{equipmentList.boot ? equipmentList.boot.map((boot, index) => <option key={index} value={boot.id}>{boot.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='cape' onChange={handleEquipmentChange}>
				{equipmentList.cape ? equipmentList.cape.map((cape, index) => <option key={index} value={cape.id}>{cape.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='glove' onChange={handleEquipmentChange}>
				{equipmentList.glove ? equipmentList.glove.map((glove, index) => <option key={index} value={glove.id}>{glove.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='neck' onChange={handleEquipmentChange}>
				{equipmentList.neck ? equipmentList.neck.map((neck, index) => <option key={index} value={neck.id}>{neck.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='ring' onChange={handleEquipmentChange}>
				{equipmentList.ring ? equipmentList.ring.map((ring, index) => <option key={index} value={ring.id}>{ring.name}</option>) : <option>Loading...</option>}
			</select>
			<select name='ammo' onChange={handleEquipmentChange}>
				{equipmentList.ammo ? equipmentList.ammo.map((ammo, index) => <option key={index} value={ammo.id}>{ammo.name}</option>) : <option>Loading...</option>}
			</select>
			<select name="monster" onChange={handleMonsterChange}>
				{monstersList ? monstersList.map((monster, index) => <option key={index} value={monster.id}>{monster.name}</option> ) : <option>Loading...</option>}
			</select>

			<select name="potion">
				<option value="">Strength Potion</option>
			</select>

			<div>{equippedGear.weapon ? equippedGear.weapon.stats[0].strBonus : 'Weapon not selected' }</div>
			<div>{currentMonster ? `Monster selected: ${currentMonster.name}` : 'Monster not selected' }</div>
			<div>{userStats ? `Equipment Str Bonus: ${userStats.equipmentStrBonus}` : 'No stats yet' }</div>
			<div>{userStats ? `User's Attack Lvl: ${userStats.attackLvl}` : 'No stats yet' }</div>
		</div>
	)
}

export default TestData;

