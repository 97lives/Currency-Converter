import React, { useState, useEffect } from 'react';
import './converter.css';

 
/**
 * Converter page
 * 
 * This is a React functional component called "ConverterPage" that allows users convert currencies based on the exchange rate.
 * At the top of the component, it defines five states using the useState() hook from React:
 * currencies: An empty array that will be used to store the available currencies.
 * sourceCurrency: The default source currency is USD.
 * targetCurrency: The default target currency is USD.
 * amount: The default amount is 1.
 * exchangeRate: An empty string that will be used to store the exchange rate.
 * It then uses the useEffect() hook to fetch currency data from an API and populate the currencies state. The second useEffect() hook is used to fetch the exchange rate from the API based on the selected source and target currencies.
 * The component also defines three functions to handle changes to the source currency, target currency, and amount.
 * The convertCurrency() function calculates the conversion result based on the selected currencies and the amount entered by the user. If the user selects the same currency for both source and target, it will display an error message.
*In the return statement, the component renders a form with three dropdown menus to select the source currency, target currency, and amount to convert. It also displays the conversion result in a paragraph element.
*Overall, this component provides a simple and user-friendly way to convert currencies based on real-time exchange rates.

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