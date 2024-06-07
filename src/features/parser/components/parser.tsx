import { Table } from './table';
import { Uploader } from './uploader';
import { DateRangePicker } from './dateRangePicker';
import { FieldNamePicker } from './fieldNamePicker';
import { DownloadExchangeRates } from './downloadExchangeRates';
import { ColumnsToHide } from './columnsToHide';
import { Downloader } from './downloader';

export const Parser = () => {
  return (
    <>
      <div>
        <DateRangePicker />
        <FieldNamePicker fieldName="dateFieldName" />
        <FieldNamePicker fieldName="amountFieldName" />
        <Downloader />
        <br />
        <DownloadExchangeRates />
        <ColumnsToHide />
      </div>
      <Uploader />
      <Table />
    </>
  );
};
