import './App.css';
import content from './static';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
   username:yup.string().required(),
   email:yup.string().required("Please enter valid email address"),
   password:yup.string().required().min(6),
   dropdown:yup.string().required(),
})

function App() {
  const {register,handleSubmit,errors} = useForm({
    resolver: yupResolver(schema),
  });
  
  const onSubmit =(data) => console.log(data);

  return (
    <div className="App">
      <h1>React-hook-form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {content.inputs.map((input,key) => {
          return(
          <div key={key}>
            <p>
              <label className="label">{input.label}</label>
            </p>
            <p>
              <input name={input.name} className="input" type={input.type} ref={register}/>
            </p>
            <p className="messages">{errors[input.name]?.message}</p>
          </div>)
        })}
        {content.drop.map((select,key) => {
          return(
            <div key={key}>
            <p>
              <label className="label">{select.label}</label>
            </p>
              <select name={select.name} ref={register} className="input">
                 <option value="">Select...</option>
                 <option value="A">Category A</option>
                 <option value="B">Category B</option>
              </select>
              <p className="messages">{errors[select.name]?.message}</p>

            </div>

          )
        })}
        
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default App;

