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
type WeightUnitType = "gr" | "lb" | "kg" | "tn";
type DistanceUnitType = "mm" | "cm" | "mts";
type IncotermType = IncotermAereoType | IncotermMaritimoType;
export type RawPropsType = {
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

type WeightType = { weightUnit: WeightUnitType; weight: number };
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

export function buildProps(props: Partial<RawPropsType> = {}): RawPropsType {
  const rawProps: RawPropsType = {
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

export function buildProduct(props: Partial<RawPropsType> = {}): ProductType {
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
  } = buildProps(props);

  const basic: ProductType = {
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

  return basic;
}
