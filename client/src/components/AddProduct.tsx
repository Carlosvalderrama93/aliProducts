import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Section from "./form/Section";
import doFetch from "../funct/fetchProducts";
import { sectionProps, type FieldPropertiesType } from "../funct/formField";
import {
  type RawProductType,
  buildRawProduct,
  buildProduct,
  type ProductType,
} from "../funct/product";

const sections = Object.keys(buildProduct());

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<RawProductType>();

  const [product, setProduct] = useState<ProductType>(buildProduct());
  const [index, setIndex] = useState<number>(0);
  const [section, setSection] = useState(sections[index]);

  async function onSubmit() {
    const finalProduct = buildProduct(getValues());
    setProduct({ ...finalProduct });
    doFetch({ ...product }, "post");
    reset(buildRawProduct());
    setIndex(0);
  }

  function nextSection(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
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
            <button onClick={(event) => nextSection(event)}>Next</button>
          )}
        </form>
      </div>
      <h2>
        Step {index + 1} of {sections.length}
      </h2>
    </div>
  );
}
