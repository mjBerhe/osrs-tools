import React, { useState, useEffect } from 'react';
import gloveImg from "../../images/Equipment/GloveSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./SelectStyle1";
const fetch = require('node-fetch');

export const SelectGlove = React.memo(({ handleEquipmentChange, equipmentList }) => {

	// NEED equipmentList for loading glove options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'glove',
		value: null,
		label: null,
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(gloveImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.glove) {
				equipmentList.glove.forEach((glove) => {
					options.push({
						label: glove.name,
						value: glove.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.glove])

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
		}

	}, [select.value])

	const handleChange = (glove) => {
		if (glove) {
			setSelect(prevSelect => ({
				...prevSelect,
				value: glove.value,
				label: glove.label,
			}))
			// console.log("handleChange was called")
		}
	}

	const handleMenuOpen = () => {
		setSelect(prevSelect => ({
			...prevSelect,
			VCWidth: 180,
			VCHeight: "auto",
			VCOpacity: 1,
		}))
	}

	const handleMenuClose = () => {
		setSelect(prevSelect => ({
			...prevSelect,
			VCWidth: 0,
			VCHeight: 0,
			VCOpacity: 0,
		}))
	}

	return(
		<div className="glove-slot">
			<img src={pic} alt="selected glove"/>
			<Select
				className="glove-select"
				placeholder="Search for Gloves"
				isSearchable
				onChange={(selectedOption) => handleChange(selectedOption)}
				onMenuOpen={() => handleMenuOpen()}
				onMenuClose={() => handleMenuClose()}
				options={select.options}
				styles={customStyles1(select)}
			/>
		</div>	
	)
})