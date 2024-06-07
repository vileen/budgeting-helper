import { Button } from 'primereact/button';
import { useModel } from '../useModel';
import { observer } from 'mobx-react';

export const DownloadExchangeRates = observer(() => {
  const model = useModel();

  if (!model.filteredData.length) return null;

  return (
    <Button onClick={model.downloadExchangeRates}>
      Download exchange rates
    </Button>
  );
});
