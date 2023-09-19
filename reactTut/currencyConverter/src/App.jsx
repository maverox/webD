import {InputBox} from "./components/";
import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(fromCurrency);
  const currencyOptions = Object.keys(currencyInfo || {});

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[toCurrency]);
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-gradient-to-r from-slate-600 via-teal-500 to-blue-950">
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border-2 border-cyan-500 rounded-lg p-5 backdrop-blur-sm bg-white/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={currencyOptions}
                onCurrencyTypeChange={(currency) => setFromCurrency(currency)}
                selectedCurrency={fromCurrency}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-teal-600 text-white px-2 py-0.5"
                onClick={swap}

              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox label="To"
                amount={convertedAmount}
                currencyOptions={currencyOptions}
                onAmouncChange={(amount) => setConvertedAmount(amount)}
                selectedCurrency={toCurrency}
                onCurrencyTypeChange={(currency) => setToCurrency(currency)}
                amountDisable={true}
                className="text-gray-600 hover:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg"
              onClick={convert}
            >
              Convert
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
