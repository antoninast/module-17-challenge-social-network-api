import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}

 export const getSingleThought = async (req: Request, res: Response) => {
  try {
    // looking for an application by id
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

export const createThought = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.body.userId, username: req.body.username });
    if (!user) {
      return res.status(404).json({
        message: 'Thought was NOT created. Enter a valid user id and username.',
      })
    }
    const thought = await Thought.create(req.body);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(updatedUser);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
}
  
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId},
      { $set: { thoughtText: req.body.thoughtText } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    
    const updatedThought = await Thought.findOne({ _id: req.params.thoughtId });
    res.json(updatedThought);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
}

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json({ message: 'Thought successfully deleted!' });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

export const addReaction = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.json('Username not found!');
    }

    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    
    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.body.reactionId } } },
      { new: true }
    );
    
    if (!thought) {
      res.json('Reaction not found')
    }

    res.json({ message: "The reaction was deleted." });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}