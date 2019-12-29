const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonsterSchema = new Schema({
	id: Number,
	name: String,
	cmbLvl: Number,
	hitpoints: Number,
	maxHit: Number,
	attType: Array,
	attSpeed: Number,
	slayerMonster: Boolean,
	slayerReq: Number,
	slayerExp: Number,
	slayerMasters: Array,
	stats: [{
		attLvl: Number,
		strLvl: Number,
		defLvl: Number,
		magLvl: Number,
		rngLvl: Number,
		attStab: Number,
		attSlash: Number,
		attCrush: Number,
		attMagic: Number,
		attRanged: Number,
		defStab: Number,
		defSlash: Number,
		defCrush: Number,
		defMagic: Number,
		defRanged: Number,
		attAccuracy: Number,
		meleeStr: Number,
		rangedStr: Number,
		magicDmg: Number,
	}],
	drops: Array,
})

module.exports = Monster = mongoose.model('Monster', MonsterSchema);