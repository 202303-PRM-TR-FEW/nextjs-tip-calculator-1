import { useState } from 'react';

const Calculator = () => {
  // TODO: start coding here!
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({
    bill: 0,
    numberOfPeople: 1,
    custom: 0,
    tip: 0
  });
  const [tipForPer, setTipForPer] = useState(0);
  const [total, setTotal] = useState(0);

  console.log('Bill:', data.bill)
  console.log('numberOfPeople:', data.numberOfPeople)
  console.log('custom:', data.custom)
  console.log('Tip:', data.tip)

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: Number(value)
    }))

    if (name === 'numberOfPeople') {
      if (value < 1) {
        setIsError(true)
      } else {
        setIsError(false)
      }
    } else if (name === 'bill') {
      if (value < 1) {
        setIsError(true)
      } else {
        setIsError(false)
      }
    }

  }

  const handleClick = e => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: Number(value)
    }))
  }

  const handleReset = () => {
    setTotal(0);
    setTipForPer(0);
    setData(prev => ({
      ...prev,
      bill: 0,
      numberOfPeople: 1,
      custom: 0,
      tip: 0
    }))
  }

  const handleTipSubmit = e => {
    e.preventDefault();
    let total = (data.bill + (data.bill * (data.custom / 100))) / data.numberOfPeople;
    let tipForPer = (data.bill * (data.custom / 100)) / data.numberOfPeople
    let total2 = (data.bill + (data.bill * (data.tip / 100))) / data.numberOfPeople;
    let tipForPer2 = (data.bill * (data.tip / 100)) / data.numberOfPeople

    if (data.custom) {
      setTipForPer(tipForPer)
      setTotal(total)
      setData(prev => ({
        ...prev,
        'tip': 0
      }))
    } else if (data.tip) {
      setTipForPer(tipForPer2)
      setTotal(total2)
    }
  }

  return (
    <main>
      <img
        src="./icons/logo.svg"
        className="logo"
        alt="Splitter logo. 'SPLI' on one line and 'TTER' on another to indicate splitting."
      />
      <section className="card">
        <div className="card-left">
          <div className="input-group" id="totalBillGroup">
            <div className="input-label-container">
              <label className="body-text input-label" htmlFor="totalBill">Bill</label>
              <small className="body-text input-error" id="totalBillError">Input field is valid</small>
            </div>
            <form onSubmit={handleTipSubmit} action="#">
              <input
                value={data.bill}
                onChange={handleChange}
                type="number"
                className={`body-l-text input-field ${isError && `focus:border-2 focus:border-red-600`}`}
                placeholder="0"
                name="bill"
                id="totalBill"
              />
            </form>
          </div>

          <div className="input-group" id="totalTipPercentageGroup">
            <div className="input-label-container">
              <label className="body-text input-label">Select Tip %</label>
              <small className="body-text input-error" id="totalTipPercentageError">Input field is
                valid</small>
            </div>
            <form onSubmit={handleTipSubmit} className="input-tips-container">
              <input type='submit'
                name='tip'
                value={5}
                onClick={handleClick}
                className="body-l-text input-tip" id="tip5">
              </input>
              <input type='submit' name='tip'
                value={10} onClick={handleClick} className="body-l-text input-tip" id="tip10">
              </input>
              <input type='submit' name='tip'
                value={15} onClick={handleClick} className="body-l-text input-tip" id="tip15">
              </input>
              <input type='submit' name='tip'
                value={25} onClick={handleClick} className="body-l-text input-tip" id="tip25">
              </input>
              <input type='submit' name='tip'
                value={50} onClick={handleClick} className="body-l-text input-tip" id="tip50">
              </input>
              <input name='custom' value={data.custom} onChange={handleChange} type="number" className="biody-l-text input-field" placeholder="Custom"
                id="totalTipPercentage"></input>
            </form>
          </div>

          <div className="input-group" id="numberOfPeopleGroup">
            <div className="input-label-container">
              <label className="body-text input-label" htmlFor="numberOfPeople">Number of People</label>
              <small className="body-text input-error" id="numberOfPeopleError">Input field is
                valid</small>
            </div>
            <form onSubmit={handleTipSubmit} action="#">
              <input
                onChange={handleChange}
                name='numberOfPeople'
                value={data.numberOfPeople}
                type="number"
                className={`body-l-text input-field ${isError && `focus:border-2 focus:border-red-600`}`}
                placeholder="0"
                id="numberOfPeople"
              />
            </form>
          </div>
        </div>
        <div className="card-right">
          <section className="card-price-container">
            <div>
              <b className="body-text card-price-title">Tip Amount</b>
              <p className="body-s-text card-price-subtitle">/ person</p>
            </div>
            <strong className="strong-text card-price-value" id="tipAmount">
              {tipForPer ? `$${tipForPer.toFixed(2)}` : '$0.00'}
            </strong>
          </section>
          <section className="card-price-container">
            <div>
              <b className="body-text card-price-title">Total</b>
              <p className="body-s-text card-price-subtitle">/ person</p>
            </div>
            <strong className="strong-text card-price-value" id="totalPrice">
              {total ? `$${total.toFixed(2)}` : '$0.00'}
            </strong>
          </section>
          <button onClick={handleReset} className="btn btn-primary btn-reset">Reset</button>
        </div>
      </section>
    </main>
  );
};

export default Calculator;