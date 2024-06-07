import { observer } from 'mobx-react';
import { Dropdown } from 'primereact/dropdown';
import { useModel } from '../useModel';

export type FieldNamePickerProps = {
  fieldName: string;
};

export const FieldNamePicker = observer(
  ({ fieldName }: FieldNamePickerProps) => {
    const model = useModel();
    const value =
      fieldName === 'dateFieldName'
        ? model.dateFieldName
        : model.amountFieldName;

    if (!model.filteredColumns.length) return null;

    return (
      <Dropdown
        placeholder={fieldName}
        value={value}
        options={model.filteredColumns.map(header => ({
          label: header,
          value: header,
        }))}
        onChange={e => e.value && model.setFieldNameValue(fieldName, e.value)}
      />
    );
  },
);
