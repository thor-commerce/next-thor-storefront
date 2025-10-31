"use server";

import { getClient } from "@/lib/thor/apollo-client";
import { getCartIdFromCookies } from "./utils";
import { CART_LINE_ITEMS_REMOVE_MUTATION, CART_LINE_ITEMS_UPDATE_MUTATION } from "./mutations";
import { CACHE_TAGS } from "@/constants";
import { updateTag } from "next/cache";


export async function updateItemQuantity(
  prevState: unknown,
  payload: {
    lineId: string;
    quantity: number;
  }
) {
  const cartId = await getCartIdFromCookies();
  await getClient().mutate({
    mutation: CART_LINE_ITEMS_UPDATE_MUTATION,
    variables: {
      input: {
        cartId,
        lineItems: [
          {
            lineItemId: payload.lineId,
            quantity: payload.quantity,
          },
        ],
      },
    },
  });
  updateTag(CACHE_TAGS.cart);

  return {
    success: true,
  };
}

export async function removeLineItem(prevState: unknown, lineId: string) {
  const cartId = await getCartIdFromCookies();
  try {
    await getClient().mutate({
      mutation: CART_LINE_ITEMS_REMOVE_MUTATION,
      variables: {
        input: {
          cartId,
          lineItemIds: [lineId],
        },
      },
    });
    updateTag(CACHE_TAGS.cart);
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
    };
  }
}

// export async function addDiscountCode(
//   prevState: DiscountCodeActionResponse | null,
//   formData: FormData
// ): Promise<DiscountCodeActionResponse> {
//   try {
//     const t = await getTranslations("DiscountCodeForm");
//     const rawData: DiscountCodeFormData = {
//       code: formData.get("code") as string,
//     };

//     const validatedData = discountCodeSchema.safeParse(rawData);

//     if (!validatedData.success) {
//       return {
//         success: false,
//         errors: z.flattenError(validatedData.error).fieldErrors,
//       };
//     }

//     const cartId = await getCartIdFromCookies();
//     const res = await getClient().mutate({
//       mutation: CART_DISCOUNT_CODE_ADD_MUTATION,
//       variables: {
//         input: {
//           cartId,
//           discountCode: validatedData.data.code, // Use the validated code
//         },
//       },
//     });

//     const { data } = res;
//     if (data?.cartDiscountCodeAdd.errors) {
//       return {
//         success: false,
//         errors: {
//           code: [t("notFoundError")],
//         },
//       };
//     }

//     updateTag(CACHE_TAGS.cart);
//     return {
//       success: true,
//     };
//   } catch (e) {
//     console.error("Error adding discount code:", e);
//     return {
//       success: false,
//       messsage: "Failed to add discount code",
//     };
//   }
// }

// export async function removeDiscountCode(
//   prevState: DiscountCodeActionResponse | null,
//   code: string
// ): Promise<DiscountCodeActionResponse> {
//   try {
//     const cartId = await getCartIdFromCookies();

//     await getClient().mutate({
//       mutation: CART_DISCOUNT_CODE_REMOVE_MUTATION,
//       variables: {
//         input: {
//           cartId,
//           discountCodes: [code],
//         },
//       },
//     });
//     updateTag(CACHE_TAGS.cart);
//     return {
//       success: true,
//     };
//   } catch (e) {
//     return {
//       success: false,
//       messsage: "Failed to remove discount code",
//     };
//   }
//   return { success: true };
// }
