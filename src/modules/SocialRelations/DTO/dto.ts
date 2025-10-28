export enum RequestStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export class UpdateRequestDto {
  status!: RequestStatus;
}