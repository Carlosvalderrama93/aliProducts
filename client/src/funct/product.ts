export type RawPropsType = {
  title: string | undefined;
  price: number | undefined;
  hsCode: string | undefined;
  packaging: string | undefined;
  volume: number | undefined;
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

type Moreinfo = {
  packaging: string | undefined;
  volume: number | undefined;
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
};

export function buildProps(props: Partial<RawPropsType> = {}): RawPropsType {
  const rawProps: RawPropsType = {
    title: "",
    price: 0,
    hsCode: "",
    packaging: "",
    volume: 0,
    privateLabel: 0,
    url: "",
    materials: [],
    samplePrice: 0,
    sampleQuantity: 0,
    sampleDelivery: 0,
    colors: [],
    sizes: [],
    unitPrice: 0,
    incoterm: "",
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
    volume,
    privateLabel,
    url,
    materials,
    samplePrice,
    sampleQuantity,
    sampleDelivery,
    colors,
    sizes,
    unitPrice,
    incoterm,
    moq,
  } = buildProps(props);

  const basic: ProductType = {
    basic: { title, price, hsCode },
    moreInfo: { packaging, volume, privateLabel, url, materials },
    sample: { samplePrice, sampleQuantity, sampleDelivery },
    variations: { colors, sizes },
    price: { unitPrice, incoterm, moq },
  };

  return basic;
}
