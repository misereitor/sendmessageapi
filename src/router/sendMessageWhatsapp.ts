import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateItemBody, sendMessageBody } from '../interfaces/bodyRequest';
import { configureItemSchedule } from '../services/createEventService';

export const sendMessageWhatsapp = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Body is required' }),
    };
  }
  let body: sendMessageBody;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Invalid JSON' }),
    };
  }
  console.log(`Executando agendamento das ${new Date()}`)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Item criado com sucesso!', body }),
  };
};