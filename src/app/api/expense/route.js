import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

import Expense from "@/models/Expense";

import cloudinary from "@/lib/cloudinary";
import fs from "fs";
import path from "path";

dbConnect();

// Ensure the 'uploads' directory exists
const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// POST request handler
export async function POST(request) {
  const formData = await request.formData();
  const user = formData.get("user");
  const expense_source = formData.get("expense_source");
  const amount = formData.get("amount");
  const imgFile = formData.get("img");

  try {
    let imgUrl = "";

    if (imgFile) {
      // Save file to disk
      const filePath = path.join(uploadDir, imgFile.name);
      await fs.promises.writeFile(
        filePath,
        Buffer.from(await imgFile.arrayBuffer())
      );

      // Upload image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(filePath);
      await fs.promises.unlink(filePath); // Remove file from disk after upload

      imgUrl = result.secure_url;
    }

    const newExpense = new Expense({
      user,
      expense_source,
      amount,
      img: imgUrl,
    });
    await newExpense.save();
    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json(
      { error: "Error creating expense" },
      { status: 500 }
    );
  }
}

// PUT request handler
export async function PUT(request) {
  const formData = await request.formData();
  const id = formData.get("id");
  const expense_source = formData.get("expense_source");
  const amount = formData.get("amount");
  const imgFile = formData.get("img");

  try {
    const updatedExpenseData = { expense_source, amount };

    if (imgFile) {
      // Save file to disk
      const filePath = path.join(uploadDir, imgFile.name);
      await fs.promises.writeFile(
        filePath,
        Buffer.from(await imgFile.arrayBuffer())
      );

      // Upload image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(filePath);
      await fs.promises.unlink(filePath); // Remove file from disk after upload

      updatedExpenseData.img = result.secure_url;
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      updatedExpenseData,
      { new: true }
    );
    return NextResponse.json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json(
      { error: "Error updating expense" },
      { status: 500 }
    );
  }
}

// DELETE request handler
export async function DELETE(request) {
  const { id } = await request.json();

  try {
    await Expense.findByIdAndDelete(id);
    return NextResponse.json({ message: "Expense deleted" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json(
      { error: "Error deleting expense" },
      { status: 500 }
    );
  }
}

// GET request handler
export async function GET(request) {
  try {
    const expenses = await Expense.find();
    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    return NextResponse.json(
      { error: "Error retrieving expenses" },
      { status: 500 }
    );
  }
}
