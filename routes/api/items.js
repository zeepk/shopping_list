const express = require('express');
const router = express.Router();

//item model

const Item = require('../../models/Item');

// @route   GET api/items
// @dec     get all items
// @access  public
router.get('/', (req, res) => {
	//since we are using the router, this represents /api/items
	Item.find()
		.sort({ date: -1 })
		.then(items => res.json(items));
});

// @route   POST api/items
// @dec     create an item
// @access  public
router.post('/', (req, res) => {
	const newItem = new Item({
		//bc Item is the name of our model at the top
		name: req.body.name //the model also has a date, but will be automatically filled in, otherwise we would need to handle others
	});
	newItem.save().then(item => res.json(item)); //save to the database, promise based. it returns the item it saves, which we spit out in json
});

// @route   DELETE api/items:id
// @dec     delete an item
// @access  public
router.delete('/:id', (req, res) => {
	Item.findById(req.params.id).then(
		item =>
			item
				.remove()
				.then(() => res.json({ success: true })) //up to you what you want to return, for now we return an object that has success as true
				.catch(err => res.status(404).json({ success: false })) //want to send response, but not res.json which will send a 200 (okay) when its not
	);
});

module.exports = router;
