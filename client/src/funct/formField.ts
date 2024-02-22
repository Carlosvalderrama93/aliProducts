import { buildProps, type RawPropsType } from "./product";

export type NameFormFieldGeneratorType =
  | "title"
  | "price"
  | "hsCode"
  | "packaging"
  | "weight"
  | "distanceUnit"
  | "weightUnit"
  | "width"
  | "height"
  | "length"
  | "privateLabel"
  | "url"
  | "materials"
  | "samplePrice"
  | "sampleQuantity"
  | "sampleDelivery"
  | "colors"
  | "sizes"
  | "incoterm"
  | "moq";

export type FormFieldPropsGeneratorType = {
  id: number;
  label: string;
  name: NameFormFieldGeneratorType;
  placeholder: string;
  validation: {
    message: string;
    maxLength: number;
    min: number;
    value: string;
    required: boolean;
    valueAsNumber: boolean;
  };
};

export function formFieldPropsGenerator(): FormFieldPropsGeneratorType[] {
  const rawProps: RawPropsType = buildProps();
  const keys = Object.keys(rawProps);
  return keys.map((key, index) => ({
    id: index,
    label: key,
    name: key as NameFormFieldGeneratorType,
    placeholder: key,
    validation: formFieldValidationGen(key),
  }));
}

function formFieldValidationGen(
  key: string,
  isRequired: boolean = false,
  isNumber: boolean = false
) {
  return {
    message: `${key} is required`,
    maxLength: 100,
    min: 0,
    value: "",
    required: isRequired,
    valueAsNumber: isNumber,
  };
}
