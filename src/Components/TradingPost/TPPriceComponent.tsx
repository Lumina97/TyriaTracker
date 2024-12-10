import {
  copperCoinURL,
  silverCoinURL,
  goldCoinURL,
} from "../../Utils/settings";

const formatPrice = (price: string) => {
  const paddedPrice = price.padStart(6, "0");

  // Extract the gold, silver, and copper values
  const gold = parseInt(paddedPrice.slice(0, -4), 10) || 0; // First 2 digits (or more)
  const silver = parseInt(paddedPrice.slice(-4, -2), 10) || 0; // Next 2 digits
  const copper = parseInt(paddedPrice.slice(-2), 10) || 0; // Last 2 digits

  return { gold, silver, copper };
};

const TPPriceComponent = ({ price }: { price: string }) => {
  const { gold, silver, copper } = formatPrice(price);

  return (
    <div className="flex items-center gap-1 justify-end">
      {gold > 0 && (
        <p className="flex items-center">
          {gold}
          <i className="bg-goldCoin w-4 h-4 bg-cover bg-center inline-block">
            {" "}
          </i>
        </p>
      )}

      {silver > 0 && (
        <p className="flex items-center">
          {silver}
          <i className="bg-silverCoin w-4 h-4 bg-cover bg-center inline-block"></i>
        </p>
      )}

      {copper > 0 && (
        <p className="flex items-center">
          {copper}
          <i className="bg-copperCoin w-4 h-4 bg-cover bg-center inline-block"></i>
        </p>
      )}
    </div>
  );
};

export default TPPriceComponent;
