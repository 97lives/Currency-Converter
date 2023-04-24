import React, { useState, useEffect } from 'react';
import './converter.css'

/*
This component displays a dropdown list of currency options to choose from. It takes currencies, label, value, and onChange as props. The currencies prop is an array of objects containing the code and name of each currency. The label prop is a string representing the label for the dropdown. The value prop is the currently selected currency code. The onChange prop is a callback function that is triggered when the user selects a new currency.
*/
function CurrencySelector({ currencies, label, value, onChange }) {
  return (
    <div>
      <label className="CurrencyLable">{label}</label>
      <select className="CurrencySelect" value={value} onChange={onChange}>
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name} ({currency.code})
          </option>
        ))}
      </select>
    </div>
  );
}

/*
This component displays an input field to enter the amount to be converted. It takes value and onChange as props. The value prop is the current amount entered by the user. The onChange prop is a callback function that is triggered when the user enters a new amount.
*/
function AmountInput({ value, onChange }) {
  return (
    <div>
      <label className="AmountLable">Amount:</label>
      <input className="AmountInput" type="number" value={value} onChange={onChange} />
    </div>
  );
}

/*
This component displays the result of the currency conversion. It takes sourceCurrency, targetCurrency, amount, and exchangeRate as props. The sourceCurrency and targetCurrency props are the currency codes for the source and target currencies. The amount prop is the amount entered by the user. The exchangeRate prop is the exchange rate for the selected currencies. If the source and target currencies are the same, it displays an error message asking the user to select different currencies.
*/
function ConverterResult({ sourceCurrency, targetCurrency, amount, exchangeRate }) {
  if (sourceCurrency === targetCurrency) {
    return <p className="Result">Please select two different currencies</p>;
  } else {
    const result = amount * exchangeRate;
    return <p className="Result">Conversion Result: {result.toFixed(2)}</p>;
  }
}

/*
This is the main component that combines the above three components and fetches the currency exchange rates from the API. It initializes four states using useState hook: currencies, sourceCurrency, targetCurrency, amount, and exchangeRate. The useEffect hook is used to fetch the list of available currencies and exchange rates from the API when the component mounts and when the sourceCurrency and targetCurrency states change. It also defines three callback functions to handle changes in the source currency, target currency, and amount.
*/
function ConverterPage() {
  const [currencies, setCurrencies] = useState([]);
  const [sourceCurrency, setSourceCurrency] = useState('usd');
  const [targetCurrency, setTargetCurrency] = useState('usd');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState('');

  useEffect(() => {
    fetch('http://www.floatrates.com/daily/tzs.json')
      .then((response) => response.json())
      .then((data) => {
        const availableCurrencies = Object.keys(data);
        const currenciesList = availableCurrencies.map((currency) => ({
          code: currency,
          name: data[currency].name,
        }));
        setCurrencies(currenciesList);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://www.floatrates.com/daily/${sourceCurrency.toLowerCase()}.json`)
      .then((response) => response.json())
      .then((data) => setExchangeRate(data[targetCurrency.toLowerCase()].rate))
      .catch((error) => console.log(error));
  }, [sourceCurrency, targetCurrency]);

  const handleSourceCurrencyChange = (event) => {
    setSourceCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div>
      <CurrencySelector
        currencies={currencies}
        label="Source Currency:"
        value={sourceCurrency}
        onChange={handleSourceCurrencyChange}
      />
      <CurrencySelector
        currencies={currencies}
        label="Target Currency:"
        value={targetCurrency}
        onChange={handleTargetCurrencyChange}
      />
      <AmountInput value={amount} onChange={handleAmountChange} />
      <ConverterResult sourceCurrency={sourceCurrency} targetCurrency={targetCurrency} amount={amount} exchangeRate={exchangeRate} />
    </div>
  );
}

export default ConverterPage;