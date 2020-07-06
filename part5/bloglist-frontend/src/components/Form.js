import React from 'react';

const Input = ({text, value, handleChange}) => (
  <div>
    {text}: <input 
      value={value}
      onChange={handleChange}
    />
  </div>
)

const Form = ({formHandler, addInputs, text}) => (
  <form onSubmit={formHandler}>
    {addInputs.map(el => 
      <Input key={el.text} text={el.text} value={el.value} handleChange={el.handler}/>
    )}
    <div>
      <button type="submit">{text}</button>
    </div>
    
  </form>
)

export default Form