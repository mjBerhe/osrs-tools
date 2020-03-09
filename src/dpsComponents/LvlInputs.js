import React from 'react';

export const LvlInputs = ({ handleStatsChange, userStats }) => {

	return(
		<div>
			<div className="attLvl">
				<label htmlFor="attackLvl" className="attLabel"><h4>Attack Level</h4></label>
				<input type="number" name='attackLvl' value={userStats.attackLvl} onChange={handleStatsChange}/>
			</div>
			<div className="strLvl">
				<label htmlFor="strengthLvl" className="strLabel"><h4>Strength Level</h4></label>
				<input type='number' name='strengthLvl' value={userStats.strengthLvl} onChange={handleStatsChange}/>
			</div>
		</div>
	)
}