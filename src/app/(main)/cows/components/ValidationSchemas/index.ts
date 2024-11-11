import { z } from "zod";

const cowUpdateSchema = z.object({
  categoryId: z.string().min(1, "Category ID is required"),
  cowId: z.string().regex(/^cow-\d+$/, "Cow ID must start with 'cow-' followed by numbers"),
  currentPregnancyStatus: z.boolean(),
  dam: z.string(),
  sire: z.string(),
  dateOfBirth: z.date(),
  name: z.string().min(1, "Name is required"),
  sex: z.enum(["Female", "Male"]).refine((val) => ["Female", "Male"].includes(val), {
    message: "Sex must be either 'Female' or 'Male'",
  }),
}).partial(); 

export default cowUpdateSchema;
