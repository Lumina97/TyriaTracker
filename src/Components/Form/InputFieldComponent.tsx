import React, { HTMLAttributes, ReactNode } from "react";

const InputFieldComponent = ({
  labelTitle,
  wrapperProps,
  labelProps,
  props,
  children,
}: {
  labelTitle: string;
  wrapperProps?: React.HTMLAttributes<HTMLElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  props: React.InputHTMLAttributes<HTMLInputElement>;
  children?: ReactNode;
}) => {
  return (
    <div
      className=" flex flex-col my-6 align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow"
      {...wrapperProps}
    >
      <label className="text-xl">{labelTitle}</label>
      <input
        className="hover:shadow-3xl border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-md bg-transparent indent-[6.5rem] w-[98%] m-auto absolute left-[1%]"
        {...props}
      />
      {children}
    </div>
  );
};

export default InputFieldComponent;
