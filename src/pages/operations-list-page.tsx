import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
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

  const theadNames = [
    'id',
    'Имя',
    'Категория',
    'Сумма',
    'Валюта',
    'Дата',
    'Время'
  ];

  const renderTableCell = (text: string | number) => <TableCell className={tcellClass}>{text}</TableCell>;

  return (
    <Card className="w-full">
      <CardHeader>Список операций</CardHeader>
      <CardContent>
        <Table className='mb-4'>
          <TableHeader>
            <TableRow>
              {theadNames.map(theadName =>
                <TableHead key={theadName} className={theadClass}>{theadName}</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {operationsFixture.map(({ amount, currency, category, description, id, process_at }) => (
              <TableRow key={`${description} - ${amount}`}>
                {renderTableCell(id)}
                {renderTableCell(description)}
                {renderTableCell(category)}
                {renderTableCell(amount)}
                {renderTableCell(currency)}
                {renderTableCell(new Date(process_at).toLocaleDateString())}
                {renderTableCell(new Date(process_at).toLocaleTimeString())}
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
