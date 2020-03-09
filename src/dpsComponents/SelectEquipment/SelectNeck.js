import React, { useState, useEffect } from 'react';
import neckImg from "../../images/Equipment/NeckSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./SelectStyle1";
const fetch = require('node-fetch');

export const SelectNeck = React.memo(({ handleEquipmentChange, equipmentList }) => {

	// NEED equipmentList for loading neck options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'neck',
		value: null,
		label: null,
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(neckImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.neck) {
				equipmentList.neck.forEach((neck) => {
					options.push({
						label: neck.name,
						value: neck.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.neck])

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

	const handleChange = (neck) => {
		if (neck) {
			setSelect(prevSelect => ({
				...prevSelect,
				value: neck.value,
				label: neck.label,
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
		<div className="neck-slot">
			<img src={pic} alt="selected neck"/>
			<Select
				className="neck-select"
				placeholder="Search for Neck"
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