import { z } from "zod";

export const bookingSchema = z
  .record(z.string(), z.coerce.number().int().min(0))
  .refine(
    (selection) => Object.values(selection).some((quantity) => quantity > 0),
    {
      message: "Choose at least one ticket",
    },
  );
