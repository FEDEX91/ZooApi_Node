const Bird = require('../models/Bird');

exports.add = async (req, res) => {
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

exports.getAll = async (req, res) => {
  try {
    const birds = await Bird.find();
    res.status(200).json({ birds });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const bird = await Bird.findById(id);
    if (!bird) {
      return res.status(404).json({ message: 'Bird not found' });
    }
    res.status(200).json({ bird });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, photoUrl } = req.body;

  try {
    const updatedBird = await Bird.findByIdAndUpdate(id, {
      name,
      description,
      photoUrl
    }, { new: true });

    if (!updatedBird) {
      return res.status(404).json({ message: 'Bird not found' });
    }

    res.status(200).json({ bird: updatedBird });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBird = await Bird.findByIdAndDelete(id);

    if (!deletedBird) {
      return res.status(404).json({ message: 'Bird not found' });
    }

    res.status(200).json({ message: 'Bird removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
