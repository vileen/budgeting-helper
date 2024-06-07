import { DataTable } from 'primereact/datatable';
import { Column, ColumnEditorOptions, ColumnEvent } from 'primereact/column';
import { useModel } from '../useModel';
import { observer } from 'mobx-react';
import { InputText } from 'primereact/inputtext';

export const Table = observer(() => {
  const model = useModel();

  if (!model.filteredColumns.length) return <p>Please upload document first</p>;

  const cellEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={e => options.editorCallback?.(e.target.value)}
        onKeyDown={e => e.stopPropagation()}
      />
    );
  };

  const onCellEditComplete = (e: ColumnEvent) => {
    const { newValue, field, rowIndex } = e;

    model.updateFieldValue(rowIndex, field, newValue);
  };

  return (
    <DataTable value={model.filteredData} editMode="cell">
      {model.filteredColumns.map((header, index) => (
        <Column
          key={index}
          field={header}
          header={header}
          sortable
          editor={options => cellEditor(options)}
          onCellEditComplete={onCellEditComplete}
        />
      ))}
    </DataTable>
  );
});
