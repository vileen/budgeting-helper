import { EStage, IModel, IUploadResponse } from "./types";
import { action, makeObservable, observable } from "mobx";

export class Model implements IModel {
  stage: EStage = EStage.Upload;
  data: string[][] = [];
  headers: string[] = [];
  errors: string[] = [];

  constructor() {
    makeObservable(this, {
      stage: observable,
      data: observable,
      headers: observable,
      adjustDocument: action.bound,
      downloadDocument: action.bound,
      uploadFile: action.bound,
    });
  }

  adjustDocument() {
    console.log("parseDocument");
    this.stage = EStage.Download;
  }

  downloadDocument() {
    console.log("downloadDocument");
  }

  uploadFile(response: IUploadResponse) {
    const { data, errors } = response;
    this.headers = data[0];
    this.data = data.slice(1, data.length - 1);
    this.errors = errors;

    this.stage = EStage.Adjust;
  }
}
