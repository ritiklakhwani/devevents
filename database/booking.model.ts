import mongoose, { Schema, Model } from "mongoose";
import { z } from "zod";

export const ZodBookingSchema = z.object({
  eventId: z.string().min(1),
  email:   z.string().email(),
});

export type IBooking = Omit<z.infer<typeof ZodBookingSchema>, "eventId"> & {
  eventId: mongoose.Types.ObjectId;
};

const BookingSchema = new Schema<IBooking>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true, index: true },
    email:   { type: String, required: true, match: [/^\S+@\S+\.\S+$/, "Invalid email"] },
  },
  { timestamps: true }
);

BookingSchema.pre("save", async function () {
  const exists = await mongoose.models.Event.exists({ _id: this.eventId });
  if (!exists) throw new Error("Referenced event does not exist");
});

const Booking: Model<IBooking> =
  mongoose.models.Booking ?? mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;

