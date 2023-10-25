import Center from './components/columns/center';
import Left from './components/columns/left';
import Right from './components/columns/right';
import Navbar from './components/navbar';
import Selector from './components/selector';

export default function Home() {
  return (
    <main className={"main"}>
      <Navbar/>
      <Selector/>
      <div className='container'>
        <Left/>
        <Center/>
        <Right/>
      </div>
    </main>
  )
}
