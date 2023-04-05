import React, { useState, useEffect } from 'react';
import './converter.css';

 
/**
 * home page
 * 
 * defines what is to be placed on the home page 
 * 
 * @author Henry Schofiled
 */

function ConverterPage() {
  const [currencies, setCurrencies] = useState([]);
  const [sourceCurrency, setSourceCurrency] = useState('usd');
  const [targetCurrency, setTargetCurrency] = useState('usd');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState('');

  useEffect(() => {
    fetch('http://www.floatrates.com/daily/tzs.json')
      .then(response => response.json())
      .then(data => {
        const availableCurrencies = Object.keys(data);
        const currenciesList = availableCurrencies.map((currency) => {
          return {
            code: currency,
            name: data[currency].name
          };
        });
        setCurrencies(currenciesList);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://www.floatrates.com/daily/${sourceCurrency.toLowerCase()}.json`)
      .then(response => response.json())
      .then(data => setExchangeRate(data[targetCurrency.toLowerCase()].rate))
      .catch(error => console.log(error));
  }, [sourceCurrency, targetCurrency]);

  const handleSourceCurrencyChange = (event) => {
    setSourceCurrency(event.target.value);
  }

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const convertCurrency = () => {
    if(sourceCurrency == targetCurrency){
      return ("please select two different currencies");
    }
    else{
      const result = amount * exchangeRate;
      return result.toFixed(2);
    }
  }

  return (
    <div>
      <div>
        <label className= "CurrencyLable">Source Currency:</label>
        <select className= "CurrencySelect" value={sourceCurrency} onChange={handleSourceCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.code})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className= "CurrencyLable">Target Currency:</label>
        <select className= "CurrencySelect" value={targetCurrency} onChange={handleTargetCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.code})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className= "AmountLable"> Amount:</label>
        <input className= "AmountInput" type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <p className= "Result">Conversion Result: {convertCurrency()}</p>
      </div>
    </div>
  );
}

 
export default ConverterPage;