import React, {createContext, useState} from 'react';

export const WeaponContext = createContext();

// GOT THE DATABASE TO WORK
// NEED TO CONNECT REACT -> NODE.JS -> MONOGODB

//const Item = require('./Data/Models/Item.js');
//const weaponList = require('./Data/DatabaseConnect.js')

export function WeaponProvider(props) {
	const [weaponID, setWeaponID] = useState([
		{
			id: 4151,
			name: 'Abyssal Whip',
		},
		{
			id: 1333,
			name: 'Rune Scimitar',
		},
		{
			id: 11806,
			name: 'Saradomin Godsword',
		},
		{
			id: 12926,
			name: 'Toxic Blowpipe',
		},
		{
			id: 11907,
			name: 'Trident of the Seas',
		},
	]);

	return (
		<WeaponContext.Provider value={[weaponID, setWeaponID]}>
			{props.children}
		</WeaponContext.Provider>
	)
}
