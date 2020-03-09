import React from 'react';
import str1 from '../images/Potions/strength/113.png';
import str2 from '../images/Potions/strength/2440.png';
import str3 from '../images/Potions/strength/23709.png';
import att0 from '../images/Potions/attack/empty.png';
import att1 from '../images/Potions/attack/2428.png';
import att2 from '../images/Potions/attack/2436.png';
import att3 from '../images/Potions/attack/23697.png';
import aprayer0 from "../images/Prayers/attack/none.png";
import aprayer1 from "../images/Prayers/attack/attack1.png";
import aprayer2 from "../images/Prayers/attack/attack2.png";
import aprayer3 from "../images/Prayers/attack/attack3.png";
import chivalry from "../images/Prayers/attack/chivalry.png";
import piety from "../images/Prayers/attack/piety.png";
import sprayer0 from "../images/Prayers/strength/none.png";
import sprayer1 from "../images/Prayers/strength/str1.png";
import sprayer2 from "../images/Prayers/strength/str2.png";
import sprayer3 from "../images/Prayers/strength/str3.png";

export const StatBoosters = ({ userStats, handleStatsChange }) => {

	const attPotions = [att0, att1, att2, att3]
	const strPotions = [att0, str1, str2, str3]
	const attPrayers = [aprayer0, aprayer1, aprayer2, aprayer3, chivalry, piety]
	const strPrayers = [sprayer0, sprayer1, sprayer2, sprayer3, chivalry, piety]

	return(
		<div>
			<div className="attPotion">
				<select name="attPotion" onChange={handleStatsChange} defaultValue={0}>
					<option value={0} hidden>Select Attack Potion</option>
					<option value={0}>None</option>
					<option value={1}>Attack Potion</option>
					<option value={2}>Super Attack Potion</option>
					<option value={3}>Divine Attack Potion</option>
				</select>
				<img src={userStats.attPotion ? attPotions[userStats.attPotion] : attPotions[0]} alt="chosen attack potion"/>
			</div>

			<div className="strPotion">
				<select name="strPotion" onChange={handleStatsChange} defaultValue={0}>
					<option value={0} hidden>Select Strength Potion</option>
					<option value={0}>None</option>
					<option value={1}>Strength Potion</option>
					<option value={2}>Super Strength Potion</option>
					<option value={3}>Divine Strength Potion</option>
				</select>
				<img src={userStats.strPotion ? strPotions[userStats.strPotion] : strPotions[0]} alt="chosen strength potion"/>
			</div>

			<div className="attPrayer">
				<select name="attPrayer" onChange={handleStatsChange} defaultValue={1}>
					<option value={1} hidden>Select Attack Prayer</option>
					<option value={1}>None</option>
					<option value={1.05}>Clarity of Thought</option>
					<option value={1.1}>Improved Reflexes</option>
					<option value={1.15}>Incredible Reflexes</option>
					<option value={1.150000000001}>Chivalry</option>
					<option value={1.2}>Piety</option>
				</select>
				<img src={attPrayers[userStats.attPrayerNumber]} alt="chosen attack prayer"/>
			</div>

			<div className="strPrayer">
				<select name="strPrayer" onChange={handleStatsChange} defaultValue={1}>
					<option value={1} hidden>Select Strength Prayer</option>
					<option value={1}>None</option>
					<option value={1.05}>Burst of Strength</option>
					<option value={1.1}>Superhuman Strength</option>
					<option value={1.15}>Ultimate Strength</option>
					<option value={1.18}>Chivalry</option>
					<option value={1.23}>Piety</option>
				</select>
				<img src={strPrayers[userStats.strPrayerNumber]} alt="chosen strength prayer"/>
			</div>
		</div>
	);
}