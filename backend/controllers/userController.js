import User from '../models/User.js';
import responseHelper from '../utils/responseHelper.js';
import moralisService from '../services/moralisService.js';

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        const walletAddress = await moralisService.createWallet();
        user.walletAddress = walletAddress;
        await user.save();
        res.json(responseHelper.success('User  created successfully', user));
    } catch (error) {
        res.status(500).json(responseHelper.error('Error creating user'));
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json(responseHelper.error('User  not found'));
        const balance = await moralisService.getBalance(user.walletAddress);
        user.balance = balance;
        res.json(responseHelper.success('User  retrieved', user));
    } catch (error) {
        res.status(500).json(responseHelper.error('Error retrieving user'));
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
        if (!user) return res.status(404).json(responseHelper.error('User  not found'));
        const balance = await moralisService.getBalance(user.walletAddress);
        user.balance = balance;
        res.json(responseHelper.success('User  updated', user));
    } catch (error) {
        res.status(500).json(responseHelper.error('Error updating user'));
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json(responseHelper.error('User  not found'));
        await moralisService.deleteWallet(user.walletAddress);
        res.json(responseHelper.success('User  deleted'));
    } catch (error) {
        res.status(500).json(responseHelper.error('Error deleting user'));
    }
};

export const createWallet = async (req, res) => {
    try {
        const walletAddress = await moralisService.createWallet();
        res.json(responseHelper.success('Wallet created successfully', walletAddress));
    } catch (error) {
        res.status(500).json(responseHelper.error('Error creating wallet'));
    }
};

export const deleteWallet = async (req, res) => {
    try {
        await moralisService.deleteWallet(req.params.walletAddress);
        res.json(responseHelper.success('Wallet deleted successfully'));
    } catch (error) {
        res.status(500).json(responseHelper.error('Error deleting wallet'));
    }
};

