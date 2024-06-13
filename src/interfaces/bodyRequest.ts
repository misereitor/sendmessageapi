interface ScheduleItem {
  timestamp_date: string;
  message: string;
}

export interface CreateItemBody {
  client_id: number;
	client_key: string;
	pacient_id: number;
	paciente_name: string;
	number_phone: string;
	process_name: string;
	process_nb: string;
	whatsapp_id: string;
  schedule: ScheduleItem[];
}

export interface sendMessageBody {
	number_phone: string;
	message: string;
}