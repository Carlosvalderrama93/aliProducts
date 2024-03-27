import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Section from "./form/Section";
import doFetch from "../funct/fetchProducts";
import { productSchema } from "./form/validations/productSchema";
import { sectionProps, type FieldPropertiesType } from "../funct/formField";
import {
  buildRawProduct,
  buildProduct,
  type ProductType,
  type RawProductType,
} from "../funct/product";

const sections = Object.keys(buildProduct());

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  const [product, setProduct] = useState<ProductType>(buildProduct());
  const [index, setIndex] = useState<number>(0);
  const [section, setSection] = useState(sections[index]);

  function onSubmit(data: Partial<RawProductType>) {
    const finalProduct = buildProduct(data);
    doFetch({ ...product, ...finalProduct }, "post");
    reset(buildRawProduct());
    setIndex(0);
  }

  async function validator(toCheck: FieldPropertiesType[]) {
    let result = true;
    for (const property in toCheck) {
      const validated = await trigger(toCheck[property].name);
      if (!validated) result = false;
    }
    return result;
  }

  async function nextSection(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    toCheck: FieldPropertiesType[]
  ) {
    event.preventDefault();

    if ((await validator(toCheck)) === false) return;
    const updatedProduct = buildProduct(getValues());
    setProduct({ ...updatedProduct });
    setIndex(index + 1);
  }

  useEffect(() => setSection(sections[index]), [index]);

  const sectionProperties: FieldPropertiesType[] = sectionProps(section);

  return (
    <div>
      <h1>Add product</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Section
            register={register}
            errors={errors}
            sectionProps={sectionProperties}
          />

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Finish
          </button>
          {index < sections.length - 1 && (
            <button
              onClick={async (event) =>
                await nextSection(event, sectionProperties)
              }
            >
              Next
            </button>
          )}
        </form>
      </div>
      <h2>
        Step {index + 1} of {sections.length}
      </h2>
    </div>
  );
}
