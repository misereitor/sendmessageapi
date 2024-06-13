import { EventBridgeClient, PutEventsCommand, PutEventsCommandInput, PutEventsCommandOutput } from '@aws-sdk/client-eventbridge';
import { CreateItemBody } from '../interfaces/bodyRequest';
import { eventBridgeParamsRequest } from '../interfaces/createEvent';

const eventBridgeClient = new EventBridgeClient({region: "us-east-2"});

export const configureItemSchedule = async (event: CreateItemBody): Promise<PutEventsCommandOutput> => {
  const date = new Date();
  const addThirtySeconds = date.setTime(date.getTime() + 30000)
  const eventParams: eventBridgeParamsRequest = {
    time: new Date(addThirtySeconds),
    source: "my.apisource",
    detailType: "create_event",
    eventBusName: "default",
    Detail: JSON.stringify(event)
  }
  console.log(eventParams);
  const createEvent = await createItemSchedule(eventParams);
  return createEvent;
};

const createItemSchedule = async (parameter: eventBridgeParamsRequest): Promise<PutEventsCommandOutput> => {
  const eventParams: PutEventsCommandInput = {
    Entries: [
      {
        Time: parameter.time,
        Source: parameter.source,
        EventBusName: parameter.eventBusName, 
        DetailType: parameter.detailType,
        Detail: parameter.Detail
      },
    ],
  };
  try {
    const command = new PutEventsCommand(eventParams)
    const response = await eventBridgeClient.send(command);
    return response;
  } catch (e) {
    throw new Error(e as string);
  }
};

const removeItemSchedule = async (): Promise<boolean> => {
  return true;
};