"use client";
import Center from './components/columns/center';
import Left from './components/columns/left';
import Right from './components/columns/right';
import Navbar from './components/navbar';
import Selector from './components/selector';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClientProvider, queryClient } from './components/multi-select/api'; // Import the QueryClientProvider

export default function Home() {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
    <main className={"main"}>
      <Navbar/>
      <Selector/>
      <div className='container'>
        <Left/>
        <Center/>
        <Right/>
      </div>
    </main>
    </QueryClientProvider>
    </LocalizationProvider>
  )
}
