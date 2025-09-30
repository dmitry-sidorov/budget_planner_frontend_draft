import { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { IconPlus, IconArrowBigUpFilled, IconArrowBigDownFilled } from '@tabler/icons-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePicker } from '@/components/ui/datepicker';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import categoryPlannedPaymentsFixture from '@/fixtures/category-planned-payments.json';
import plannedIncomesFixture from '@/fixtures/planned-incomes.json';

const currencies = ['BYN', 'USD'];

export function CurrencySelector() {
  return (
    <Select defaultValue={currencies[0]}>
      <Label>Валюта</Label>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Валюта</SelectLabel>
          {currencies.map((currency) => <SelectItem value={currency}>{currency}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

import './App.css';

const onSubmit = (data) => console.log('onSubmit: ', data);

export function DialogDemo() {
  return (
    <Dialog>
      <form onSubmit={onSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <IconPlus /> Создать платёж
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Создать платёж</DialogTitle>
            <DialogDescription>
              Добавить планируемый платёж
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Название</Label>
              <Input id="name" name="name" defaultValue="Платёж" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="amount">Сумма</Label>
              <Input id="amount" name="amount" defaultValue={100} />
            </div>
            <CurrencySelector />
          </div>
          <DialogFooter>
            <Button type="submit">Создать</Button>
            <DialogClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

interface PlannedPayment {
  amount: number;
  currency: string;
  name: string;
}

interface PlannedCategory {
  id: number;
  category: string;
  payments: PlannedPayment[];
}

const calculateSum = (items: number[]) => items.reduce((sum, item) => sum + item, 0);

const mapPaymentAmount = ({ amount }: PlannedPayment) => amount;

const calculatePaymentsTotal = (payments: PlannedPayment[]) => calculateSum(payments.map(mapPaymentAmount))

function App() {
  const [startDate, setStartDate] = useState();
  const formMethods = useForm();
  const { control } = formMethods;

  const renderCategoryTable = (payments: PlannedPayment[], total: number) => (
    <Table className='mb-4'>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left w-full">Имя</TableHead>
          <TableHead className="text-center w-150">Сумма</TableHead>
          <TableHead className="text-right w-150">Валюта</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map(({ amount, currency, name }) => (
          <TableRow key={`${name} - ${amount}`}>
            <TableCell className="text-left font-light">{name}</TableCell>
            <TableCell className="font-light w-150">{amount}</TableCell>
            <TableCell className="font-light text-right w-150">{currency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-left">Сумма</TableCell>
          <TableCell>{total}</TableCell>
          <TableCell className="text-right">{'BYN'}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );

  const getTotal = () => {
    const totalIncome = calculatePaymentsTotal(plannedIncomesFixture);
    const totalPayment = calculateSum(categoryPlannedPaymentsFixture.map(({ payments }) => calculatePaymentsTotal(payments)));

    return totalIncome - totalPayment;
  };

  const renderAccordionContent = (plannedCategories: PlannedCategory[]) =>
    plannedCategories.map(({ category, payments }, i) => {
      const total = calculatePaymentsTotal(payments);
      const currency = 'BYN'; // hardcoded

      return (
        <AccordionItem value={`item-${i + 1}`}>
          <AccordionTrigger>
            <span className='flex'>
              <span className='font-light min-w-80'>{category}</span>
              <span className='flex text-red-600'>
                {'('}
                <IconArrowBigDownFilled  size={15}/>
                {`${total} ${currency})`}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {renderCategoryTable(payments, total)}
            <DialogDemo />
          </AccordionContent>
        </AccordionItem>
      );
    });

  return (
    <form>
      <FormProvider {...formMethods}>
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Создание плана</CardTitle>
            <CardDescription>
              Введите параметры
            </CardDescription>
            {/* <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction> */}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-6">
                <Controller
                  control={control}
                  name='startDate'
                  render={({ field: { onChange, value } }) =>
                    <DatePicker label='Начальная дата' {...{ onChange, value }} />
                  }
                />
                <Controller
                  control={control}
                  name='endDate'
                  render={({ field: { onChange, value } }) =>
                    <DatePicker label='Конечная дата' {...{ onChange, value }} />
                  }
                />
              </div>
              <Label>Категории</Label>
              <Accordion type="single" collapsible>
                <AccordionItem value='item-0'>
                  <AccordionTrigger>
                    <span className='flex'>
                      <span className='font-light min-w-80'>Поступление</span>
                      <span className='flex text-green-600'>
                        {'('}
                        <IconArrowBigUpFilled  size={15}/>
                        {`${calculatePaymentsTotal(plannedIncomesFixture)} BYN)`}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {renderCategoryTable(plannedIncomesFixture, calculatePaymentsTotal(plannedIncomesFixture))}
                    <DialogDemo />
                  </AccordionContent>
                </AccordionItem>
                {renderAccordionContent(categoryPlannedPaymentsFixture)}
              </Accordion>
            </div>
            <hr />
            <div className='flex w-full font-semibold text-sm mt-4'>
              <span className='text-left min-w-80'>Сумма</span>
              <span>{`(${getTotal()} BYN)`}</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Сохранить
            </Button>
            <Button variant="secondary" className="w-full">
              Закрыть
            </Button>
          </CardFooter>
        </Card>
      </FormProvider>
    </form>
  );
}

export default App;
