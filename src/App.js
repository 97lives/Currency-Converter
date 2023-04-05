import Banner from './Components/banner';
import Converter from './Components/converter';
import './App.css';

/**
 * app page
 * 
 * defines what is to be placed on the page
 * 
 * @author Henry Schofiled
 */

function App() {
  return (
    <div className='appClass'>

      <Banner />
      <Converter/>

    </div>
  );
}

export default App;
