import React, { useState, useEffect } from 'react';
import weaponImg from "../../images/Equipment/WeaponSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./SelectStyle1";
import { customStyles2 } from "./SelectStyle2";
const fetch = require('node-fetch');

export const SelectWeapon = React.memo(({ handleEquipmentChange, handleStyleChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading weapon options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'weapon',
		value: null,
		label: null,
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [select2, setSelect2] = useState({
		name: 'weapon',
		value: null,
		label: null,
		controlWidth: 56,
		ICMarginLeft: 0,
		options: [],
	})

	const [pic, setPic] = useState(weaponImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.weapon) {
				equipmentList.weapon.forEach((weapon) => {
					options.push({
						label: weapon.name,
						value: weapon.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.weapon])

	// for loading style options once weapon is selected
	// looping over keys since the stances object contains an object of objects, NOT array of objects
	useEffect(() => {
		const loadOptions2 = () => {
			const options = [];
			if (equippedGear.weapon) {
				// checking if equipped weapon is a melee weapon
				if (equippedGear.weapon.stances.stance0.attType) {
					Object.keys(equippedGear.weapon.stances).forEach((stance) => {
						options.push({
							label: `${equippedGear.weapon.stances[stance].attType} - ${equippedGear.weapon.stances[stance].attStyle}`,
							value: `${equippedGear.weapon.stances[stance].attType[0]} - ${equippedGear.weapon.stances[stance].attStyle[1]}`,
						})
					})
				// else should be a ranged weapon
				} else {
					Object.keys(equippedGear.weapon.stances).forEach((stance) => {
						options.push({
							label: equippedGear.weapon.stances[stance].cmbStyle,
							value: equippedGear.weapon.stances[stance].cmbStyle[0],
						})
					})
				}

				setSelect2((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions2();
	}, [equippedGear.weapon])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (select.value) {
				id = select.value;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url)
			}
			//console.log("fetchImage was called")
		}
		fetchImage();

		if (select.value) {
			handleEquipmentChange(select.name, select.value);
			//console.log("handleEquipmentChange was called")
			//console.log(select.value)
		}

	}, [select.value])

	// for calling handleStyleChange everytime a new weapon style was called
	useEffect(() => {
		if (select2.label) {
			handleStyleChange(select2.label);
			//console.log("handleStyleChange was called")
		}
	}, [select2.label])

	const handleChange = (weapon) => {
		if (weapon) {
			setSelect(prevSelect => ({
				...prevSelect,
				value: weapon.value,
				label: weapon.label,
			}))
		}
	}

	const handleChange2 = (style) => {
		if (style) {
			setSelect2(prevSelect => ({
				...prevSelect,
				value: style.value,
				label: style.label,
			}))
		}
	}

	const handleMenuOpen = () => {
		setSelect(prevSelect => ({
			...prevSelect,
			VCWidth: 180,
			VCHeight: "auto",
			VCOpacity: 1,
		}))

		setSelect2(prevSelect => ({
			...prevSelect,
			controlWidth: 36,
			ICMarginLeft: 0,
		}))
	}

	const handleMenuClose = () => {
		setSelect(prevSelect => ({
			...prevSelect,
			VCWidth: 0,
			VCHeight: 0,
			VCOpacity: 0,
		}))

		setSelect2(prevSelect => ({
			...prevSelect,
			controlWidth: 56,
			ICMarginLeft: 0,
		}))
	}

	return(
		<div className="weapon-section">
			<div className="weapon-slot">
				<img src={pic} alt="selected weapon"/>
				<Select
					className="weapon-select"
					placeholder="Search for weapon"
					isSearchable
					onChange={(selectedOption) => handleChange(selectedOption)}
					onMenuOpen={() => handleMenuOpen()}
					onMenuClose={() => handleMenuClose()}
					options={select.options}
					styles={customStyles1(select)}
				/>
			</div>
			<div className="style-slot">
				<Select
					className="style-select"
					placeholder=""
					isSearchable={false}
					onChange={(selectedOption) => handleChange2(selectedOption)}
					options={select2.options}
					styles={customStyles2(select2)}
				/>
			</div>	
		</div>
	)
})