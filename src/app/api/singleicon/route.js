import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SingleIcon from "@/models/singleicon";
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
  const quantity = formData.get("quantity");

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

    const newSingleIcon = new SingleIcon({
      user,
      income_source,
      amount,
      img: imgUrl,
      quantity,
    });
    await newSingleIcon.save();
    return NextResponse.json(newSingleIcon, { status: 201 });
  } catch (error) {
    console.error("Error creating SingleIcon:", error);
    return NextResponse.json(
      { error: "Error creating SingleIcon" },
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
    const updatedSingleIconData = { income_source, amount };

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

      updatedSingleIconData.img = result.secure_url;
    }

    const updatedSingleIncome = await SingleIcon.findByIdAndUpdate(
      id,
      updatedSingleIncome,
      { new: true }
    );
    return NextResponse.json(updatedSingleIncome);
  } catch (error) {
    console.error("Error updating SingleIncome:", error);
    return NextResponse.json(
      { error: "Error updating SingleIncome" },
      { status: 500 }
    );
  }
}

// DELETE request handler
export async function DELETE(request) {
  const { id } = await request.json();

  try {
    await SingleIcon.findByIdAndDelete(id);
    return NextResponse.json({ message: "SingleIncome deleted" });
  } catch (error) {
    console.error("Error deleting SingleIncome:", error);
    return NextResponse.json(
      { error: "Error deleting SingleIncome" },
      { status: 500 }
    );
  }
}

// GET request handler
export async function GET(request) {
  try {
    const singleicons = await SingleIcon.find();
    return NextResponse.json(singleicons);
  } catch (error) {
    console.error("Error retrieving singleicons:", error);
    return NextResponse.json(
      { error: "Error retrieving singleicons" },
      { status: 500 }
    );
  }
}
