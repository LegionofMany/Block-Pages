import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { utils } from "ethers";
const { verifyMessage } = utils;

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const register = async (req, res) => {
  try {
    const { username, name, email, password, walletAddress } = req.body;
    // Check if email is already used by a MetaMask user (email ends with @blockpages.metamask)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If the existing user is a MetaMask user, allow upgrade to full user
      if (existingUser.email.endsWith('@blockpages.metamask')) {
        existingUser.username = username || existingUser.username;
        existingUser.name = name || existingUser.name;
        existingUser.email = email; // Overwrite with real email
        existingUser.password = password;
        existingUser.walletAddress = walletAddress || existingUser.walletAddress;
        await existingUser.save();
        return res.status(200).json({ message: "Account upgraded successfully" });
      }
      // Otherwise, block duplicate registration
      return res.status(409).json({ error: "A user with this email already exists. Please login or use a different email." });
    }
    // Normal registration
    const user = new User({ username, name, email, password, walletAddress });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "No account found with this email. Please register first." });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password. Please try again or reset your password." });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: "Login failed. Please try again later." });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const metamaskLogin = async (req, res) => {
  try {
    console.log('MetaMask login request:', req.body); // Debug log
    const { address, message, signature } = req.body;
    if (!address || !message || !signature) {
      console.error('MetaMask login error: Missing fields', req.body);
      return res.status(400).json({ error: "Missing fields" });
    }
    // Recover signer address with error logging
    let recovered;
    try {
      recovered = verifyMessage(message, signature);
    } catch (err) {
      console.error("Signature verification error:", err);
      return res.status(400).json({ error: "Signature verification error: " + err.message });
    }
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      console.error('Signature verification failed:', { recovered, address });
      return res.status(401).json({ error: "Signature verification failed. Please sign with the correct wallet." });
    }
    // Find or create user by wallet address
    let user = await User.findOne({ walletAddress: address });
    if (!user) {
      const username = `metamask-${address.toLowerCase()}`;
      const email = `${address.toLowerCase()}@blockpages.metamask`;
      user = new User({ username, name: username, email, walletAddress: address });
      try {
        await user.save();
      } catch (err) {
        // Handle duplicate key error (wallet, email, or username already exists)
        if (err.code === 11000) {
          console.error('Duplicate key error:', err);
          return res.status(409).json({ error: "A user with this wallet address or email already exists. Please login instead." });
        }
        console.error('User creation error:', err);
        return res.status(400).json({ error: "User creation error: " + err.message });
      }
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role, walletAddress: user.walletAddress } });
  } catch (err) {
    console.error('MetaMask login error:', err);
    res.status(400).json({ error: "MetaMask login error: " + err.message });
  }
};
