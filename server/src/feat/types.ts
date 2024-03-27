export type RawPropsType = {
  title: string | undefined;
  price: number | undefined;
  hsCode: string | undefined;
  packaging: string | undefined;
  volume: Volume;
  privateLabel: number | undefined;
  url: string | undefined;
  materials: string[] | undefined;
  samplePrice: number | undefined;
  sampleQuantity: number | undefined;
  sampleDelivery: number | undefined;
  colors: string[] | undefined;
  sizes: string[] | undefined;
  unitPrice: number | undefined;
  incoterm: string | undefined;
  moq: number | undefined;
};

type Basic = {
  title: string | undefined;
  price: number | undefined;
  hsCode: string | undefined;
};

type Volume = {
  unit: "mm" | "cm" | "mts";
  total: number;
  width: number;
  height: number;
  length: number;
};
type Moreinfo = {
  packaging: string | undefined;
  volume: Volume;
  privateLabel: number | undefined;
  url: string | undefined;
  materials: string[] | undefined;
};

type Sample = {
  samplePrice: number | undefined;
  sampleQuantity: number | undefined;
  sampleDelivery: number | undefined;
};

type variations = {
  colors: string[] | undefined;
  sizes: string[] | undefined;
};

type Price = {
  unitPrice: number | undefined;
  incoterm: string | undefined;
  moq: number | undefined;
};

export type ProductType = {
  basic: Basic;
  moreInfo: Moreinfo;
  sample: Sample;
  variations: variations;
  price: Price;
  id: string;
};
