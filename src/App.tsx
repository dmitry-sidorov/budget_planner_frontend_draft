import { useForm, FormProvider } from 'react-hook-form';

import PlansPage from '@/pages/plans-page';

import './App.css';

const App = () => {
  const formMethods = useForm();

  return (
    <form>
      <FormProvider {...formMethods}>
        <PlansPage />
      </FormProvider>
    </form>
  );
}

export default App;
