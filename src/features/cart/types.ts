export interface DiscountCodeFormData {
  code: string;
}

export interface DiscountCodeActionResponse {
  success: boolean;
  messsage?: string;
  errors?: {
    [K in keyof DiscountCodeFormData]?: string[];
  };
}

