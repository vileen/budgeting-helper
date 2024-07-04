import { Button } from 'primereact/button';
import { useModel } from '../useModel';
import { observer } from 'mobx-react';

export const DownloadExchangeRates = observer(() => {
  const model = useModel();

  return (
    <Button onClick={model.downloadExchangeRates}>
      Download exchange rates
    </Button>
  );
});
