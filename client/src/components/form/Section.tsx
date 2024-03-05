import type { FieldErrors, UseFormRegister } from "react-hook-form";

import FieldSelector from "./FieldSelector";
import type { RawProductType } from "../../funct/product";
import type { FieldPropertiesType } from "../../funct/formField";

type props = {
  sectionProps: FieldPropertiesType[];
  errors: FieldErrors<RawProductType>;
  register: UseFormRegister<RawProductType>;
};

function Section({ sectionProps, errors, register }: props) {
  return sectionProps.map((categoryProps) => (
    <FieldSelector
      errors={errors}
      register={register}
      key={categoryProps.id}
      name={categoryProps.name}
      label={categoryProps.label}
      validation={categoryProps.validation}
      placeholder={categoryProps.placeholder}
    />
  ));
}

export default Section;
