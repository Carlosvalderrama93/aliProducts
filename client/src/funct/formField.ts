import { buildProduct, type ProductType, type RawProductType } from "./product";

type KeysExtractorType = Record<ProductKeysType, string[]>;
export type FieldsType<T> = { [K in keyof T]: K }[keyof T];
export type FieldKeysType = FieldsType<RawProductType>;
type ProductKeysType = keyof ProductType;

export type FieldPropertiesType = {
  id: number;
  label: FieldKeysType;
  name: FieldKeysType;
  placeholder: FieldKeysType;
  validation: {
    message: string;
    maxLength: number;
    min: number;
    value: string;
    required: boolean;
    valueAsNumber: boolean;
  };
};

export function createValidator(
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

export function sectionProps(section: string): FieldPropertiesType[] {
  type SectionsType = { [key: string]: string[] };
  const sections: SectionsType = keysExtractor(buildProduct());
  return sections[section].map((field: string, index: number) => ({
    id: index,
    label: field as FieldKeysType,
    name: field as FieldKeysType,
    placeholder: field as FieldKeysType,
    validation: createValidator(field),
  }));
}

function keysExtractor(product: ProductType): KeysExtractorType {
  const keys: KeysExtractorType = {} as KeysExtractorType;
  for (const key in product) {
    if (Object.prototype.hasOwnProperty.call(product, key)) {
      keys[key as ProductKeysType] = Object.keys(
        product[key as ProductKeysType]
      );
    }
  }

  return keys;
}
