
// NEED TO FIX THIS FUNCTION TO STYLE
// ALSO NEED TO MAKE AN ONCHANGE FUNCTION THAT UPDATES STATS
// WHENEVER STYLE CHANGES


export function customStyles2 (state) {
	return {
		// the first bar (dropdownIndicator + valueContainer + the X?)
		control: (base) => ({
			...base,
			width: state.controlWidth,
			height: 13,
			minHeight: 13,
			backgroundColor: "white",
			display: "flex",
			marginLeft: state.ICMarginLeft,
		}),
		// where the selected option goes
		valueContainer: (base) => ({
			...base,
			backgroundColor: "",
			width: 0,
			height: 0,
			opacity: 0,
			minHeight: 13,
		}),
		// the dropdown arrow
		dropdownIndicator: (base) => ({
			...base,
			width: 35,
			marginTop: -22.5,
		}),
		// the box containing the dropdown arrow
		indicatorsContainer: (base) => ({
			...base,
			backgroundColor: "",
			width: state.controlWidth,
			height: 0,
			display: "flex",
			justifyContent: "center",
			margin: 0,
			paddingTop: 3,
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
			width: 150,
			marginTop: -0.75,
			fontSize: 13,
		}),
	}
}