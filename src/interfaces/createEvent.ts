interface eventBridgeMessage {
  message: string;
  phoneNumber: string;
}

export interface eventBridgeParamsRequest {
  source: string;
  eventBusName: string;
  detailType: string;
  time: Date;
  Detail: eventBridgeMessage;
}
