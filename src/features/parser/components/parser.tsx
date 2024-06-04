import { useModel } from '../useModel';
import { EStage } from '../types';
import { Button } from 'primereact/button';
import { Uploader } from './uploader';
import { Adjust } from './adjust';
import { observer } from 'mobx-react';

export const Parser = observer(() => {
  const model = useModel();

  switch (model.stage) {
    case EStage.Upload:
      return <Uploader />;
    case EStage.Adjust:
      return <Adjust />;
    case EStage.Download:
      return (
        <div>
          <h1>Download</h1>
          <Button onClick={model.downloadDocument}>Download</Button>
        </div>
      );
    default:
      return null;
  }
});
