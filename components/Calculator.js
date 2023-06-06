import { useState } from 'react';

const Calculator = () => {
  // TODO: start coding here!
  const [data, setData] = useState({
    bill: '',
    numberOfPeople: '',
    custom: '',
  });
  const [tip, setTip] = useState();
  const [tipForPer, setTipForPer] = useState()


  console.log('Bill:', data.bill)
  console.log('numberOfPeople:', data.numberOfPeople)
  console.log('custom:', data.custom)
  console.log('Tip:', tip)

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClick = e => {
    const tipValue = e.target.textContent.replace('%', '');
    setTip(tipValue)

  }


  const handleTipSubmit = e => {
    e.preventDefault();
    if (data.custom) {
      setTipForPer((data.bill * (data.custom / 100)) / data.numberOfPeople)
    } else {
      setTipForPer((data.bill * (tip / 100)) / data.numberOfPeople)
    }
    console.log(tipForPer)
    setData(prev => ({
      ...prev,
      bill: '',
      numberOfPeople: '',
      custom: '',
    }))
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
                className="body-l-text input-field"
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
            <div onSubmit={handleTipSubmit} className="input-tips-container">
              <button
                onClick={handleClick}
                className="body-l-text input-tip" id="tip5">5%
              </button>
              <button onClick={handleClick} className="body-l-text input-tip" id="tip10">10%
              </button>
              <button onClick={handleClick} className="body-l-text input-tip" id="tip15">15%
              </button>
              <button onClick={handleClick} className="body-l-text input-tip" id="tip25">25%
              </button>
              <button onClick={handleClick} className="body-l-text input-tip" id="tip50">50%
              </button>
              <input name='custom' value={data.custom} onChange={handleChange} type="number" className="body-l-text input-field" placeholder="Custom"
                id="totalTipPercentage"></input>
            </div>
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
                className="body-l-text input-field"
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
            <strong className="strong-text card-price-value" id="tipAmount">${tipForPer ? tipForPer : '0.00'}</strong>
          </section>
          <section className="card-price-container">
            <div>
              <b className="body-text card-price-title">Total</b>
              <p className="body-s-text card-price-subtitle">/ person</p>
            </div>
            <strong className="strong-text card-price-value" id="totalPrice">$0.00</strong>
          </section>
          <button className="btn btn-primary btn-reset">Reset</button>
        </div>
      </section>
    </main>
  );
};

export default Calculator;