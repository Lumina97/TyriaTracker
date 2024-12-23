import React, { ReactNode } from "react";

const InputFieldComponent = ({
  labelTitle,
  wrapperProps,
  wrapperClassName,
  labelProps,
  labelClassName,
  props,
  inputClassName,
  children,
}: {
  labelTitle: string;
  wrapperProps?: React.HTMLAttributes<HTMLElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  props: React.InputHTMLAttributes<HTMLInputElement>;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={`flex flex-col my-8 align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow ${wrapperClassName} `}
      {...wrapperProps}
    >
      <label className={`text-xl ${labelClassName}`}>{labelTitle}</label>
      <input
        className={`hover:shadow-3xl border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-md bg-transparent indent-[1rem] w-[98%] m-auto absolute top-[2.25rem] left-[1%] ${inputClassName}`}
        {...props}
      />
      {children}
    </div>
  );
};

export default InputFieldComponent;
