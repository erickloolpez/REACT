import {ClassState} from '../Components/ClassState/ClassState'
import {UseState} from '../Components/UseState/UseState'
import './App.css';

function App() {
  return (

    <div>
      <UseState name='useState'/>
      <ClassState name='classSate'/>
    </div>
  );
}

export default App;
