"use server";

import { gql } from "@/__generated__/thor";
import { getClient } from "@/lib/thor/apollo-client";
import { revalidatePath } from "next/cache";

export type UpdateProfileState = { error?: string; success?: boolean } | null;

const CUSTOMER_UPDATE_MUTATION = gql(/* GraphQL */ `
  mutation CustomerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
    }
  }
`);

export async function updateProfile(_currentState: unknown, formData: FormData): Promise<UpdateProfileState> {
  try {
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();

    if (!email) {
      return { error: "Email is required." };
    }

    const { data } = await getClient().mutate({
      mutation: CUSTOMER_UPDATE_MUTATION,
      variables: {
        input: {
          email,
          firstName: firstName || null,
          lastName: lastName || null,
        },
      },
    });

    if (!data?.customerUpdate.customer) {
      return { error: "Could not update profile." };
    }

    revalidatePath("/[countryCode]/account", "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong, please try again." };
  }
}
