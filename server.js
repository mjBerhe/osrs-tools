const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();
const weapons = require('./routes/api/weapons');
const shields = require('./routes/api/shields');
const helmets = require('./routes/api/helmets');
const necklaces = require('./routes/api/necklaces');
const capes = require('./routes/api/capes');
const ammos = require('./routes/api/ammos');
const chests = require('./routes/api/chests');
const legs = require('./routes/api/legs');
const gloves = require('./routes/api/gloves');
const boots = require('./routes/api/boots');
const rings = require('./routes/api/rings');
const monsters = require('./routes/api/monsters');

// Use Routes
app.use(express.json());
app.use('/api/weapons', weapons);
app.use('/api/shields', shields);
app.use('/api/helmets', helmets);
app.use('/api/necklaces', necklaces);
app.use('/api/capes', capes);
app.use('/api/ammos', ammos);
app.use('/api/chests', chests);
app.use('/api/legs', legs);
app.use('/api/gloves', gloves);
app.use('/api/boots', boots);
app.use('/api/rings', rings);
app.use('/api/monsters', monsters);


// Connect to MongoDB
const mongoDB = 'mongodb://127.0.0.1/item_database';
mongoose
	.connect(mongoDB, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
	res.json(people)
})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));