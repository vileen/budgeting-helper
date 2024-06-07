import { observer } from 'mobx-react';
import { useCSVDownloader } from 'react-papaparse';
import { useModel } from '../useModel';

export const Downloader = observer(() => {
  const { CSVDownloader, Type } = useCSVDownloader();
  const model = useModel();

  return (
    <CSVDownloader
      type={Type.Button}
      filename={'filename'}
      bom={true}
      config={{
        delimiter: ',',
      }}
      data={model.outputData}
    >
      Download
    </CSVDownloader>
  );
});
