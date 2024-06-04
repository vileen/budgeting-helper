import { CSSProperties } from 'react';
import { useCSVReader } from 'react-papaparse';
import { Button } from 'primereact/button';
import { useModel } from '../useModel';
import { IUploadResponse } from '../types';

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    gap: '10px',
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  } as CSSProperties,
};

export const Uploader = () => {
  const { CSVReader } = useCSVReader();
  const model = useModel();

  return (
    <CSVReader
      onUploadAccepted={(results: IUploadResponse) => {
        model.uploadFile(results);
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style={styles.csvReader}>
            <Button type="button" {...getRootProps()} style={styles.browseFile}>
              Browse file
            </Button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <Button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </Button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
  );
};
