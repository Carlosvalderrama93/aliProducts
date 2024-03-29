type IncotermMaritimoType =
  | "EXW"
  | "FOB"
  | "CFR"
  | "CIF"
  | "FAS"
  | "CPT"
  | "CIP"
  | "DAT"
  | "DAP"
  | "DDP";

type IncotermAereoType = "EXW" | "FCA" | "CPT" | "CIP" | "DAP" | "DAT" | "DDP";
export type IncotermType = IncotermAereoType | IncotermMaritimoType;

type DistanceUnitType = "mm" | "cm" | "mts";
type WeightUnitType = "gr" | "lb" | "kg" | "tn";
type WeightType = { weightUnit: WeightUnitType; weight: number };

export type RawProductType = {
  title: string;
  price: number;
  hsCode: string;
  packaging: string;
  weightUnit: WeightUnitType;
  weight: number;
  distanceUnit: DistanceUnitType;
  width: number;
  height: number;
  length: number;
  privateLabel: number;
  url: string;
  materials: string[];
  samplePrice: number;
  sampleQuantity: number;
  sampleDelivery: number;
  colors: string[];
  sizes: string[];
  incoterm: IncotermType;
  moq: number;
};

type VolumeType = {
  distanceUnit: DistanceUnitType;
  width: number;
  height: number;
  length: number;
};

type BasicType = {
  title: string;
  price: number;
  hsCode: string;
  moq: number;
  incoterm: IncotermType;
};

type MoreinfoType = {
  packaging: string;
  privateLabel: number;
  url: string;
  materials: string[];
};

type SampleType = {
  samplePrice: number;
  sampleQuantity: number;
  sampleDelivery: number;
};

type variationsType = {
  colors: string[];
  sizes: string[];
};

export type ProductType = {
  weight: WeightType;
  volume: VolumeType;
  basic: BasicType;
  moreInfo: MoreinfoType;
  sample: SampleType;
  variations: variationsType;
};

export function buildRawProduct(
  props: Partial<RawProductType> = {}
): RawProductType {
  const rawProps: RawProductType = {
    title: "",
    price: 0,
    hsCode: "",
    packaging: "",
    weightUnit: "gr",
    weight: 0,
    distanceUnit: "cm",
    width: 0,
    height: 0,
    length: 0,
    privateLabel: 0,
    url: "",
    materials: [],
    samplePrice: 0,
    sampleQuantity: 0,
    sampleDelivery: 0,
    colors: [],
    sizes: [],
    incoterm: "EXW",
    moq: 0,
  };

  return { ...rawProps, ...props };
}

export function buildProduct(props: Partial<RawProductType> = {}): ProductType {
  const {
    title,
    price,
    hsCode,
    packaging,
    weight,
    weightUnit,
    distanceUnit,
    width,
    height,
    length,
    privateLabel,
    url,
    materials,
    samplePrice,
    sampleQuantity,
    sampleDelivery,
    colors,
    sizes,
    incoterm,
    moq,
  } = buildRawProduct(props);

  return {
    basic: { title, price, hsCode, incoterm, moq },
    weight: { weightUnit, weight },
    volume: { width, height, length, distanceUnit },
    moreInfo: {
      packaging,
      privateLabel,
      url,
      materials,
    },
    sample: { samplePrice, sampleQuantity, sampleDelivery },
    variations: { colors, sizes },
  };
}
