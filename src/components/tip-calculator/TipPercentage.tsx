import { ChangeEvent } from 'react';

export interface TipPercentageProps {
  tipPercentageValue: number;
  onSelectPercentage: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TipPercentage = ({ tipPercentageValue, onSelectPercentage }: TipPercentageProps) => {
  return (
    <div>
      <input
        type="radio"
        name="tip"
        value={tipPercentageValue}
        id={tipPercentageValue.toString()}
        onChange={(e) => onSelectPercentage(e)}
      />
      <label htmlFor={tipPercentageValue.toString()}>{`${tipPercentageValue}%`}</label>
    </div>
  );
};

export default TipPercentage;
