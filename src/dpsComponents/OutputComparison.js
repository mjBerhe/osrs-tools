import React from 'react';
import { roundNumber } from '../formulas/roundNumber';

export const OutputComparison = React.memo(({finalOutput, finalOutput2, dps, dps2}) => {
	return (
		<div className="final-outputs">
			<h4 className="fo-armorSet-title">Armor Set</h4>
			<h4 className="fo-maxHit-title">Max Hit</h4>
			<h4 className="fo-accuracy-title">Accuracy</h4>
			<h4 className="fo-dps-title">DPS</h4>

			<h4 className="fo1-title">Armor Set 1</h4>
			<div className="fo1-maxHit">
				{finalOutput.maxHit > finalOutput2.maxHit && finalOutput.maxHit && finalOutput2.maxHit ? <strong>{finalOutput.maxHit ? finalOutput.maxHit : 'N/A'}</strong> : <h4>{finalOutput.maxHit ? finalOutput.maxHit : 'N/A'}</h4>}
			</div>
			<div className="fo1-accuracy">
				{finalOutput.accuracy > finalOutput2.accuracy && finalOutput.accuracy && finalOutput2.accuracy ? <strong>{finalOutput.accuracy ? `${roundNumber(finalOutput.accuracy, 5)*100}%` : 'N/A'}</strong> : <h4>{finalOutput.accuracy ? `${roundNumber(finalOutput.accuracy, 5)*100}%` : 'N/A'}</h4>}
			</div>
			<div className="fo1-dps">
				{dps > dps2 && dps && dps2 ? <strong>{dps ? roundNumber(dps, 5) : 'N/A'}</strong> : <h4>{dps ? roundNumber(dps, 5) : 'N/A'}</h4>}
			</div>

			<h4 className="fo2-title">Armor Set 2</h4>
			<div className="fo2-maxHit">
				{finalOutput2.maxHit > finalOutput.maxHit && finalOutput.maxHit && finalOutput2.maxHit? <strong>{finalOutput2.maxHit ? finalOutput2.maxHit : 'N/A'}</strong> : <h4>{finalOutput2.maxHit ? finalOutput2.maxHit : 'N/A'}</h4>}
			</div>
			<div className="fo2-accuracy">
				{finalOutput2.accuracy > finalOutput.accuracy && finalOutput.accuracy && finalOutput2.accuracy? <strong>{finalOutput2.accuracy ? `${roundNumber(finalOutput2.accuracy, 5)*100}%` : 'N/A'}</strong> : <h4>{finalOutput2.accuracy ? `${roundNumber(finalOutput2.accuracy, 5)*100}%` : 'N/A'}</h4>}
			</div>
			<div className="fo2-dps">
				{dps2 > dps && dps2 && dps ? <strong>{dps2 ? roundNumber(dps2, 5) : 'N/A'}</strong> : <h4>{dps2 ? roundNumber(dps2, 5) : 'N/A'}</h4>}
			</div>
		</div>
	)
})