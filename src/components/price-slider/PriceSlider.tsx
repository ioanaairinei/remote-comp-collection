import { useState } from 'react';
import './price-slider.less';

const PriceSlider = () => {
  const [value, setValue] = useState<string>('50.00');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e?.target?.value).toFixed(2);
    setValue(newValue);
  };

  return (
    <div className="wrapper">
      <div className="amount">
        <sup>$</sup>
        <span className="dollars">{value}</span>
      </div>
      <input type="range" id="priceRange" min="0" max="100" step="0.1" onInput={handleInputChange} />
      <br />
      <button>Buy Now</button>
    </div>
  );
};

export default PriceSlider;
