import { observer } from 'mobx-react';
import { MultiSelect } from 'primereact/multiselect';
import { useModel } from '../useModel';

export const ColumnsToHide = observer(() => {
  const model = useModel();

  if (!model.columns.length) return null;

  return (
    <MultiSelect
      placeholder="Columns to hide"
      value={model.columnsToHide}
      options={model.columns.map(header => ({
        label: header,
        value: header,
      }))}
      onChange={e => model.setColumnsToHide(e.value)}
    />
  );
});
