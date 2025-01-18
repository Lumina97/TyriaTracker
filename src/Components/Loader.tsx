const Loader = () => {
  return (
    <div className=" z-50 left-0 top-0 fixed w-screen h-screen backdrop-blur-sm">
      <div className="top-[50%] left-[50%] absolute  w-[50px] h-[50px] border-[12px] border-t-[12px] border-solid border-white border-t-solid  border-t-sun rounded-[50%]  animate-spin "></div>
    </div>
  );
};

export default Loader;
