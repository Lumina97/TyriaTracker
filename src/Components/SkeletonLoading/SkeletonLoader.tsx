const SkeletonLoader = ({ amountOfRows }: { amountOfRows: number }) => {
  return (
    <div className="space-y-4">
      {[...Array(amountOfRows)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-700 h-6 rounded-md"
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
