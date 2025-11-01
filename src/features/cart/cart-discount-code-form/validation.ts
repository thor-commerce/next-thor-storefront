import z from "zod";

export const discountCodeSchema = z.object({
  //customer
  code: z.string({ message: "Discount code is required" }).min(1),
});