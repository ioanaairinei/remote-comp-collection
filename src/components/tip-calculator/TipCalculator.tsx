import { ChangeEvent, useCallback, useState } from 'react';
import TipPercentage from './TipPercentage';
import './tip-calculator.less';

const AvailableTipPercentages = {
  FIVE: 5,
  TEN: 10,
  FIFTEEN: 15,
  TWENTY: 20,
};

const availableTipPercentageValues = Object.values(AvailableTipPercentages);
const regexp = new RegExp(`^[0-9]*$`);

const TipCalculator = () => {
  const [totalBillAmount, setTotalBillAmount] = useState<number>(0);
  const [numberOfPersons, setNumberOfPersons] = useState<number>(1);
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalPerPerson, setTotalPerPerson] = useState<string>('0');

  const handleOnPercentageSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTipPercentage(parseInt(e?.target?.value));
    },
    [setTipPercentage],
  );

  const onBillAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat((e?.target as HTMLInputElement).value);
      if (validateInput(e.target.name, newValue)) {
        setTotalBillAmount(newValue);
      }
    },
    [setTotalBillAmount],
  );

  const onNoOfPersonsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (validateInput(e.target.name, parseInt(e?.target.value))) {
        setNumberOfPersons(parseInt(e?.target.value));
      }
    },
    [setNumberOfPersons],
  );

  const validateInput = (field: string, value: number) => {
    if (Number.isNaN(value)) {
      return false;
    }

    switch (field) {
      case 'number-of-people':
        return regexp.test(value.toString());
        break;
      case 'bill-amount':
        break;
      default:
        break;
    }

    return true;
  };

  const calculate = () => {
    const newTipAmount = (tipPercentage * totalBillAmount) / 100;

    setTipAmount(newTipAmount);
    setTotalPerPerson(parseFloat(String((totalBillAmount + newTipAmount) / numberOfPersons)).toFixed(2));
  };

  return (
    <div className="tip-calculator-wrapper">
      <div className="tip-amount">
        <div className="label">Tip Amount</div>
        <div className="dollars">
          <sup>$</sup>
          <span id="tip-amount">{tipAmount}</span>
        </div>
      </div>
      <div className="total-per-person">
        <div className="label">Total Per Person</div>
        <div className="dollars">
          <sup>$</sup>
          <span id="total-per-person">{totalPerPerson}</span>
        </div>
      </div>

      <div className="input-fields">
        <div className="bill-amount">
          <div className="field">
            <input
              type="text"
              id="bill-amount"
              name="bill-amount"
              pattern="[+-]?\d+(?:[.,]\d+)?"
              value={totalBillAmount}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onBillAmountChange(e)}
              onFocus={(e) => e.target.select()}
              autoFocus
            />
          </div>
          <div className="label">Bill Amount</div>
        </div>
        <div className="number-of-people">
          <div className="field">
            <input
              type="text"
              id="number-of-people"
              name="number-of-people"
              value={numberOfPersons}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onNoOfPersonsChange(e);
              }}
              onFocus={(e) => e.target.select()}
            />
          </div>
          <div className="label">Number of People</div>
        </div>
      </div>

      <div className="tip-percentages">
        {Object.values(availableTipPercentageValues).map((tipPercentage: number) => (
          <TipPercentage
            key={tipPercentage}
            tipPercentageValue={tipPercentage}
            onSelectPercentage={handleOnPercentageSelect}
          />
        ))}
      </div>
      <div className="button-wrapper">
        <button id="calculate" onClick={calculate}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;
