import {AsyncHandler} from "../utils/AsyncHandler.js";
import bussinessProfileModel from "../models/bussinessProfile.model.js";
import charityProfileModel from "../models/charityProfile.model.js";
import bcrypt from 'bcryptjs'
import volunteerProfileModel from "../models/volunteerProfile.model.js";
import jwt from 'jsonwebtoken'

export const loginUser = AsyncHandler(async(req,res)=>{
    const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password, and role are required" });
  }

  let user;
  if (role === "business") {
    user = await bussinessProfileModel.findOne({ "contact.email": email });
  } else if (role === "charity") {
    user = await charityProfileModel.findOne({ "contact.email": email });
  } else if (role === "volunteer") {
    user = await volunteerProfileModel.findOne({ "contact.email": email });
  } else {
    return res.status(400).json({ message: "Invalid role specified" });
  }

  // Check if user exists
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.contact.email,
      role,
    },
  });
})

export const businessSignup = AsyncHandler(async(req,res)=>{
    const { name, address, contact, openingHours, deliveryOptions, registrationNumber, foodSafetyCertifications, password } = req.body;

    if (!name || !contact?.phone || !contact?.email || !password) {
      return res.status(400).json({ message: "Name, phone, email, and password are required." });
    }

    try {
      const existingBusiness = await bussinessProfileModel.findOne({ "contact.email": contact.email });
      if (existingBusiness) {
        return res.status(400).json({ message: "Business with this email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const business = new bussinessProfileModel({
        name,
        address,
        contact,
        openingHours,
        deliveryOptions,
        registrationNumber,
        foodSafetyCertifications,
        password: hashedPassword,
      });

      await business.save();

    const token = jwt.sign(
        { id: business._id, role: "business" }, 
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
  
      res.status(201).json({ 
        message: "Business registered successfully", 
        business, 
        token 
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
})

export const volunteerSignup = AsyncHandler(async(req,res)=>{
    const {
        name,
        password,
        contact,
        identityVerification,
        vehicle,
        experienceLevel,
        availability,
      } = req.body;
    
      // Required field validation
      if (
        !name ||
        !password ||
        !contact?.phone ||
        !contact?.email ||
        !vehicle?.type ||
        !vehicle?.registrationNumber ||
        !vehicle?.capacity
      ) {
        return res.status(400).json({ message: "Missing required fields." });
      }
    
      try {
        // Check if a volunteer with the same email exists
        const existingVolunteer = await volunteerProfileModel.findOne({ "contact.email": contact.email });
        if (existingVolunteer) {
          return res.status(400).json({ message: "Volunteer with this email already exists." });
        }
    
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create a new volunteer
        const newVolunteer = new volunteerProfileModel({
          name,
          password: hashedPassword,
          contact,
          identityVerification,
          vehicle,
          experienceLevel,
          availability,
          assignedDonations: [], // Empty array
        });
    
        await newVolunteer.save();
        
        const token = jwt.sign(
            { id: newVolunteer._id, role: "volunteer" }, 
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
  
        res.status(201).json({ message: "Volunteer registered successfully", volunteer: newVolunteer,token });
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
})

export const charitySignup = AsyncHandler(async(req,res)=>{
    const { name, address, contact, verificationStatus, foodRequirements, operatingHours, password } = req.body;

    if (!name || !contact?.phone || !contact?.email || !foodRequirements?.category || !foodRequirements?.maxCapacityKg || !password) {
      return res.status(400).json({ message: "Name, phone, email, food requirements, and password are required." });
    }

    try {
      const existingCharity = await charityProfileModel.findOne({ "contact.email": contact.email });
      if (existingCharity) {
        return res.status(400).json({ message: "Charity with this email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const charity = new charityProfileModel({
        name,
        address,
        contact,
        verificationStatus,
        foodRequirements,
        operatingHours,
        password: hashedPassword,
      });

      
    const token = jwt.sign(
        { id: charity._id, role: "charity" }, 
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
  
      await charity.save();
      res.status(201).json({ message: "Charity registered successfully", charity,token });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
})