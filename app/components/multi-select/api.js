import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

const fetchAutoCompleteData = async () => {
  const response = await fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

const queryClient = new QueryClient();

export const useAutoCompleteData = () => {
  return useQuery('autoCompleteData', fetchAutoCompleteData);
};

export { queryClient, QueryClientProvider };
