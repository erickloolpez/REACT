import {UseReducer} from '../UseReducer'
import {UseState} from '../Components/UseState/UseState'
import './App.css';

function App() {
  return (

    <div>
      <UseState name='useState'/>
      <UseReducer name='useReducer'/>
    </div>
  );
}

export default App;
