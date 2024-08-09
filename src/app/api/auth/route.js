// src/app/api/auth/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const data = await req.json();
    const { action, email, password, username } = data;

    console.log("Received data:", data);

    if (!action) {
      return NextResponse.json(
        { message: "Action is required" },
        { status: 400 }
      );
    }

    switch (action) {
      case "register":
        if (!email || !password || !username) {
          return NextResponse.json(
            { message: "Please add all fields" },
            { status: 400 }
          );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return NextResponse.json(
            { message: "User already exists" },
            { status: 400 }
          );
        }

        // Create new user
        const newUser = new User({ email, password, username });
        await newUser.save();

        // Generate token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return NextResponse.json({ token, user: newUser }, { status: 201 });

      case "login":
        if (!email || !password) {
          return NextResponse.json(
            { message: "Please add all fields" },
            { status: 400 }
          );
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
          return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
          );
        }

        // Convert user document to plain object and remove the password field
        const { password: _, ...userWithoutPassword } = user.toObject();

        // Generate token
        const loginToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return NextResponse.json(
          { token: loginToken, user: userWithoutPassword },
          { status: 200 }
        );

      case "forgot-password":
        if (!email) {
          return NextResponse.json(
            { message: "Please provide an email" },
            { status: 400 }
          );
        }

        const forgotUser = await User.findOne({ email });
        if (!forgotUser) {
          return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
          );
        }

        const resetToken = jwt.sign(
          { id: forgotUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );
        const resetLink = `https://${req.headers.get(
          "host"
        )}/reset-password?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password Reset",
          text: `Click the link to reset your password: ${resetLink}`,
        });

        return NextResponse.json(
          { message: "Password reset link sent to your email" },
          { status: 200 }
        );

      default:
        return NextResponse.json(
          { message: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
