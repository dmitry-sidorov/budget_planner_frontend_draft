import { Card, CardHeader, CardContent } from '@/components/ui/card';
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
import operationsFixture from '@/fixtures/operations.json';

export const OperationsListPage = () => {
  const theadClass = 'text-left w-150';
  const tcellClass = `${theadClass} font-light`;
  const tfooterClass = 'text-left w-150';

  return (
    <Card className="w-full">
      <CardHeader>Список операций</CardHeader>
      <CardContent>
        <Table className='mb-4'>
          <TableHeader>
            <TableRow>
              <TableHead className={theadClass}>id</TableHead>
              <TableHead className={theadClass}>Имя</TableHead>
              <TableHead className={theadClass}>Категория</TableHead>
              <TableHead className={theadClass}>Сумма</TableHead>
              <TableHead className={theadClass}>Валюта</TableHead>
              <TableHead className="text-right">Дата</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operationsFixture.map(({ amount, currency, category, description, id, process_at }) => (
              <TableRow key={`${description} - ${amount}`}>
                <TableCell className={tcellClass}>{id}</TableCell>
                <TableCell className={tcellClass}>{description}</TableCell>
                <TableCell className={tcellClass}>{category}</TableCell>
                <TableCell className={tcellClass}>{amount}</TableCell>
                <TableCell className={tcellClass}>{currency}</TableCell>
                <TableCell className="font-light text-right">{process_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className={tfooterClass}>Сумма</TableCell>
              <TableCell className={tfooterClass}></TableCell>
              <TableCell className={tfooterClass}></TableCell>
              <TableCell className={tfooterClass}>{0}</TableCell>
              <TableCell className={tfooterClass}>{'BYN'}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
