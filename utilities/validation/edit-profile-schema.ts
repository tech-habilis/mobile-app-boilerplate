import { z } from "zod";
import { phoneSchema } from "./schema";

// Generic edit profile schema - customize based on your app's needs
export const editProfileSchema = z.object({
  firstName: z.string().min(1, "validation.firstNameRequired"),
  lastName: z.string().min(1, "validation.lastNameRequired"),
  birthDate: z.string().min(1, "validation.birthDateRequired"),
  gender: z.string().min(1, "validation.genderRequired"),
  phone: phoneSchema,
  bio: z.string().optional(),
  displayName: z.string().optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
