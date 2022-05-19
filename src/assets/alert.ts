export class Alert {
  public constructor(
    public saveSuccess: string,
    public saveFailed: string,
    public updateSuccess: string,
    public updateFailed: string,
    public removeSuccess: string,
    public removeFailed: string,
    public formValidateError: string,
    public backendError: string,
    public processFailed: string,
    public fileUploadFailed: string,
  ) {
  }
}
