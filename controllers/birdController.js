const Bird = require('../models/Bird');

exports.addBird = async (req, res) => {
  const { name, description, photoUrl } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }

  try {
 
    const bird = new Bird({
      name,
      description,
      photoUrl
    });

    const savedBird = await bird.save();

    res.status(201).json({ bird: savedBird });
    
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};