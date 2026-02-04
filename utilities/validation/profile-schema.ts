import { z } from "zod";
import { phoneSchema } from "./schema";

// Generic complete profile schema - customize based on your app's needs
export const completeProfileSchema = z.object({
  avatarUrl: z.string().optional(),
  firstName: z.string().min(1, "validation.firstNameRequired"),
  lastName: z.string().min(1, "validation.lastNameRequired"),
  birthDate: z.string().min(1, "validation.birthDateRequired"),
  gender: z.string().min(1, "validation.genderRequired"),
  phone: phoneSchema,
  bio: z.string().optional(),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;
