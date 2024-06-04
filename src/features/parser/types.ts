export enum EStage {
  Upload,
  Adjust,
  Download,
}

export interface IUploadResponse {
  data: string[][];
  errors: string[];
}

export interface IModel {
  stage: EStage;
  headers: string[];
  data: string[][];
  uploadFile: (results: IUploadResponse) => void;
  adjustDocument: () => void;
  downloadDocument: () => void;
}
