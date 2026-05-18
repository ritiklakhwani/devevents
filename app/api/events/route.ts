import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "invalid JSON data format" },
        { status: 400 },
      );
    }

    const file = formData.get("image") as File;

    if (!file) return NextResponse.json({ message: "Image file is required" });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);

            resolve(results);
          },
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Event creation failed",
      error: error instanceof Error ? error.message : "Unknown",
    });
  }
};

export const GET = async () => {
  try {
    await connectToDatabase();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "event fetched succesfully", events },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "event fetching failed", error: error },
      { status: 500 },
    );
  }
};
