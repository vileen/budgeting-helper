import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useModel } from '../useModel';
import { observer } from 'mobx-react';

export const Table = observer(() => {
  const model = useModel();

  if (!model.headers.length) return <p>Please upload document first</p>;

  return (
    <DataTable value={model.filteredData}>
      {model.headers.map((header, index) => (
        <Column key={index} field={header} header={header} sortable />
      ))}
    </DataTable>
  );
});
