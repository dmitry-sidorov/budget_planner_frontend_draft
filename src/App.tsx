import { useForm, FormProvider } from 'react-hook-form';

import { PlansPage, OperationsListPage } from '@/pages';

import './App.css';

const App = () => {
  const formMethods = useForm();

  return (
    <form>
      <FormProvider {...formMethods}>
        <PlansPage />
        <OperationsListPage />
      </FormProvider>
    </form>
  );
}

export default App;
