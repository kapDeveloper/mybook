import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Income from "@/models/Income";
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
  const income_source = formData.get("income_source");
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

    const newIncome = new Income({ user, income_source, amount, img: imgUrl });
    await newIncome.save();
    return NextResponse.json(newIncome, { status: 201 });
  } catch (error) {
    console.error("Error creating income:", error);
    return NextResponse.json(
      { error: "Error creating income" },
      { status: 500 }
    );
  }
}

// PUT request handler
export async function PUT(request) {
  const formData = await request.formData();
  const id = formData.get("id");
  const income_source = formData.get("income_source");
  const amount = formData.get("amount");
  const imgFile = formData.get("img");

  try {
    const updatedIncomeData = { income_source, amount };

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

      updatedIncomeData.img = result.secure_url;
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      updatedIncomeData,
      { new: true }
    );
    return NextResponse.json(updatedIncome);
  } catch (error) {
    console.error("Error updating income:", error);
    return NextResponse.json(
      { error: "Error updating income" },
      { status: 500 }
    );
  }
}

// DELETE request handler
export async function DELETE(request) {
  const { id } = await request.json();

  try {
    await Income.findByIdAndDelete(id);
    return NextResponse.json({ message: "Income deleted" });
  } catch (error) {
    console.error("Error deleting income:", error);
    return NextResponse.json(
      { error: "Error deleting income" },
      { status: 500 }
    );
  }
}

// GET request handler
export async function GET(request) {
  try {
    const incomes = await Income.find();
    return NextResponse.json(incomes);
  } catch (error) {
    console.error("Error retrieving incomes:", error);
    return NextResponse.json(
      { error: "Error retrieving incomes" },
      { status: 500 }
    );
  }
}
