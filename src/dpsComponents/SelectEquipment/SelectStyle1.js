export function customStyles1 (state) {
	return {
		// the first bar (dropdownIndicator + valueContainer + the X?)
		control: (base) => ({
			...base,
			width: 20 + state.VCWidth,
			height: 36,
			backgroundColor: "white",
			display: "flex",
			flexDirection: "row-reverse",
		}),
		// where the selected option goes
		valueContainer: (base) => ({
			...base,
			backgroundColor: "",
			width: state.VCWidth,
			height: state.VCHeight,
			opacity: state.VCOpacity,
		}),
		// the dropdown arrow
		dropdownIndicator: (base) => ({
			...base,
			width: 35,
			marginTop: -3,
		}),
		// the box containing the dropdown arrow
		indicatorsContainer: (base) => ({
			...base,
			backgroundColor: "",
			width: 20,
			display: "flex",
			justifyContent: "center",
			marginRight: -1,
		}),
		// the line between the valueContainer and dropdownIndicator
		indicatorSeparator: (base) => ({
			...base,
			display: "none",
		}),
		// the x to reset the currently selected option
		clearIndicator: (base) => ({
			...base,
			color: "",
			display: "none",
		}),
		// the box containing the options
		menu: (base) => ({
			...base,
			width: 200,
			marginTop: -0.75,
			fontSize: 13,
		}),
		// not sure?
		option: (base) => ({
			...base,
		}),
	}
}