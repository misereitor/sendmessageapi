export interface CreateItemBody {
	number_phone: string;
	process_number: number;
	paciente_name: string;
	recurrence: number;
}

export interface sendMessageBody {
	number_phone: string;
	message: string;
}