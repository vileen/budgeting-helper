import { Calendar } from 'primereact/calendar';
import { observer } from 'mobx-react';
import { useModel } from '../useModel';
import { getFirstKey } from '../utils';

export const DateRangePicker = observer(() => {
  const model = useModel();
  const maxDate = new Date(getFirstKey(model.exchangeRates));

  return (
    <Calendar
      value={model.datesRange}
      onChange={e => model.setDatesRange(e.value)}
      maxDate={maxDate}
      selectionMode="range"
      readOnlyInput
      hideOnRangeSelection
      locale="pl"
    />
  );
});
