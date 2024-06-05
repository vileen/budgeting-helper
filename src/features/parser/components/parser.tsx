import { Table } from './table';
import { Uploader } from './uploader';
import { DateRangePicker } from './dateRangePicker';

export const Parser = () => {
  return (
    <>
      <DateRangePicker />
      <Uploader />
      <Table />
    </>
  );
};
