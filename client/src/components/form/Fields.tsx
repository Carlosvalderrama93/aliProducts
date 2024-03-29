import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { FieldKeysType, FieldPropertiesType } from "../../funct/formField";
import type { RawProductType } from "../../funct/product";

export type FormFieldProps = Omit<FieldPropertiesType, "id"> & {
  type: string;
  register: UseFormRegister<RawProductType>;
  errors: FieldErrors<RawProductType>;
};

export function InputField(props: FormFieldProps) {
  const { label, name, type, placeholder, register, errors } = props;

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {errors[name as keyof typeof errors] && (
        <span className="text-red-500 text-xs italic">
          {errors[name as keyof typeof errors]?.message}
        </span>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
    </>
  );
}

export function TextAreaField(
  props: Pick<FormFieldProps, "name" | "register">
) {
  const { name, register } = props;
  return <textarea {...register(name)} />;
}

export function ShippingField(
  props: Pick<FormFieldProps, "name" | "register">
) {
  const { name, register } = props;
  const [shipping, setShipping] = useState<string>("aereo");
  const [incotermsOpt, setIncotermsOpt] = useState<string[]>([]);
  const values = ["aereo", "maritimo"];

  useEffect(() => {
    const aereoInco = ["EXW", "FCA", "CPT", "CIP", "DAP", "DAT", "DDP"];
    const maritimoInco = [
      "EXW",
      "FOB",
      "CFR",
      "CIF",
      "FAS",
      "CPT",
      "CIP",
      "DAT",
      "DAP",
      "DDP",
    ];
    if (shipping === "maritimo") return setIncotermsOpt(maritimoInco);
    if (shipping === "aereo") return setIncotermsOpt(aereoInco);
  }, [shipping]);
  return (
    <div>
      {
        <RadioField
          name={name}
          register={register}
          values={values}
          setState={setShipping}
          state={shipping}
        />
      }
      {
        <SelectField
          incotermsOpt={incotermsOpt}
          name={name}
          register={register}
        />
      }
    </div>
  );
}

export function WeightField(
  props: Omit<FormFieldProps, "label" | "placeholder">
) {
  const [weightUnit, setWeightUnit] = useState("gr");
  const { name, register, errors } = props;
  const values = ["gr", "lb", "kg", "tn"];
  return (
    <div>
      <RadioField
        name={name}
        register={register}
        setState={setWeightUnit}
        state={weightUnit}
        values={values}
      />
      <InputField
        label={"weight"}
        name={"weight"}
        placeholder={name}
        register={register}
        errors={errors}
        type="text"
      />
    </div>
  );
}

export function DistanceField(
  props: Omit<FormFieldProps, "placeholder" | "label">
) {
  const [distanceUnit, setDistanceUnit] = useState("cm");
  const { name, register, errors } = props;
  const values = ["mm", "cm", "mts"];
  const names: Partial<RawProductType>[] = ["width", "height", "length"];
  return (
    <div>
      <RadioField
        name={name}
        register={register}
        setState={setDistanceUnit}
        state={distanceUnit}
        values={values}
      />
      {names.map((name, index) => {
        return (
          <InputField
            key={index}
            label={name as FieldKeysType}
            name={name as FieldKeysType}
            placeholder={name as FieldKeysType}
            register={register}
            errors={errors}
            type="text"
          />
        );
      })}
    </div>
  );
}

export function RadioField(
  props: Pick<FormFieldProps, "name" | "register"> & {
    values: string[];
    setState: Dispatch<SetStateAction<string>>;
    state: string;
  }
) {
  const { name, register, values, state, setState } = props;

  return values.map((value, index) => (
    <div key={index}>
      <label>{value}</label>
      <input
        {...register(name)}
        type="radio"
        value={value}
        checked={value === state}
        onChange={(e) => e.target.value && setState(value)}
      />
    </div>
  ));
}

function SelectField(
  props: Pick<FormFieldProps, "name" | "register"> & { incotermsOpt: string[] }
) {
  const { name, incotermsOpt, register } = props;
  return (
    <select {...register(name)}>
      {" "}
      {incotermsOpt?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function SpecialField(
  props: Omit<FormFieldProps, "label" | "placeholder">
) {
  const { name, register, errors, type } = props;

  switch (name) {
    case "incoterm":
      return <ShippingField name={name} register={register} />;
    case "weightUnit":
      return (
        <WeightField
          name={name}
          errors={errors}
          register={register}
          type={type}
        />
      );
    case "distanceUnit":
      return (
        <DistanceField
          name={name}
          errors={errors}
          register={register}
          type={type}
        />
      );
  }
}
