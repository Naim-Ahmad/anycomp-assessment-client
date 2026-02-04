import { z } from "zod";

export const editServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z
    .string()
    .max(500)
    .refine((v) => v.trim().split(/\s+/).length <= 500, "Maximum 500 words"),

  estimatedDays: z.number().min(1),
  price: z.number().min(0),

  offerings: z.array(z.string()),
});

export type EditServiceForm = z.infer<typeof editServiceSchema>;
