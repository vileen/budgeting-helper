import { Calendar } from 'primereact/calendar';
import { observer } from 'mobx-react';
import { useModel } from '../useModel';

export const DateRangePicker = observer(() => {
  const model = useModel();

  return (
    <Calendar
      value={model.datesRange}
      onChange={e => model.setDatesRange(e.value)}
      selectionMode="range"
      readOnlyInput
      hideOnRangeSelection
      locale="pl"
    />
  );
});
