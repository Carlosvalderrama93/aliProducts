import { z } from "zod";
import type { IncotermType } from "../../../funct/product";

const zIncotermMaritimo = z.enum([
  "EXW",
  "FOB",
  "CFR",
  "CIF",
  "FAS",
  "CPT",
  "CIP",
  "DAT",
  "DAP",
  "DDP",
]);

const zIncotermAereo = z.enum([
  "EXW",
  "FCA",
  "CPT",
  "CIP",
  "DAP",
  "DAT",
  "DDP",
]);

const zIncoterm: z.ZodType<IncotermType> = z.union([
  zIncotermMaritimo,
  zIncotermAereo,
]);

export const productSchema = z.object({
  // distanceUnit: z.optional(z.enum(["mm", "cm", "mts"])),
  title: z
    .string()
    .min(2, { message: "Title must have at least 2 characters" })
    .trim()
    .toLowerCase(),
  price: z.string().refine((price) => !isNaN(parseFloat(price)), {
    message: "Price must be a number",
  }),

  hsCode: z
    .string()
    .min(4, { message: "HS code must have at least 4 characters" })
    .optional(),
  incoterm: zIncoterm.optional(),
  moq: z.string().refine((incoterm) => !isNaN(parseFloat(incoterm)), {
    message: "MOQ must be a number",
  }),

  weightUnit: z.optional(z.enum(["gr", "lb", "kg", "tn"])),
  weight: z.optional(
    z.string().refine((weight) => !isNaN(parseFloat(weight)), {
      message: "Weight must be a number",
    })
  ),

  width: z.optional(
    z.string().refine((width) => !isNaN(parseFloat(width)), {
      message: "Width must be a number",
    })
  ),

  height: z.optional(
    z.string().refine((height) => !isNaN(parseFloat(height)), {
      message: "Height must be a number",
    })
  ),

  length: z.optional(
    z.string().refine((length) => !isNaN(parseFloat(length)), {
      message: "Length must be a number",
    })
  ),

  packaging: z.optional(
    z.string().min(3, {
      message: "Packaging description must be at least 3 characters",
    })
  ),

  privateLabel: z.optional(
    z.string().refine((privateLabel) => !isNaN(parseFloat(privateLabel)), {
      message: "Privite label quantity must be a number",
    })
  ),

  url: z.optional(
    z
      .string()
      .url()
      .trim()
      .optional()
      .superRefine((url, context) => {
        // Optional superRefine for URL validation (example)
        if (url && !url.startsWith("https://")) {
          context.addIssue({
            code: "custom",
            message: "URL should start with https:// for secure connection",
            path: ["url"],
          });
          // You can choose to return false for validation failure or true with a warning
          return true; // Adjust based on your needs
        }
        return true;
      })
  ),

  materials: z.optional(z.string().optional()),

  samplePrice: z.optional(
    z.string().refine((samplePrice) => !isNaN(parseFloat(samplePrice)), {
      message: "Sample price must be a number",
    })
  ),

  sampleQuantity: z.optional(
    z.string().refine((sampleQuantity) => !isNaN(parseFloat(sampleQuantity)), {
      message: "Sample quantity must be a number",
    })
  ),

  sampleDelivery: z.optional(
    z.string().refine((sampleDelivery) => !isNaN(parseFloat(sampleDelivery)), {
      message: "Sample price delivery must be a number",
    })
  ),

  colors: z.optional(z.string().optional()),
  sizes: z.optional(z.string().optional()),
});
