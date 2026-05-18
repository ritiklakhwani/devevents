import mongoose, { Schema, Model } from "mongoose";
import { z } from "zod";


export const ZodEventSchema = z.object({
  title:       z.string().min(1),
  slug:        z.string().optional(),
  description: z.string().min(1),
  overview:    z.string().min(1),
  image:       z.string().min(1),
  venue:       z.string().min(1),
  location:    z.string().min(1),
  date:        z.string().min(1),
  time:        z.string().min(1),
  mode:        z.enum(["online", "offline", "hybrid"]),
  audience:    z.string().min(1),
  agenda:      z.array(z.string()),
  organizer:   z.string().min(1),
  tags:        z.array(z.string()),
});

export type IEvent = z.infer<typeof ZodEventSchema>;

const EventSchema = new Schema<IEvent>(
  {
    title:       { type: String, required: true },
    slug:        { type: String, unique: true },
    description: { type: String, required: true },
    overview:    { type: String, required: true },
    image:       { type: String, required: true },
    venue:       { type: String, required: true },
    location:    { type: String, required: true },
    date:        { type: String, required: true },
    time:        { type: String, required: true },
    mode:        { type: String, enum: ["online", "offline", "hybrid"], required: true },
    audience:    { type: String, required: true },
    agenda:      { type: [String], required: true },
    organizer:   { type: String, required: true },
    tags:        { type: [String], required: true },
  },
  { timestamps: true }
);

EventSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }
});

const Event: Model<IEvent> =
  mongoose.models.Event ?? mongoose.model<IEvent>("Event", EventSchema);

export default Event;
