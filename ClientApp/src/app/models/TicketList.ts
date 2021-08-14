import { NzUploadFile } from 'ng-zorro-antd/upload';

export interface TicketList {
  sNo: number;
  assignedTo: string;
  clientID: number;
  fullName: string;
  accountManager: string;
  ticketNo: number;
  type: string;
  category: string;
  status: string;
  highPriority: number;
  priority: string;
  source: string;
  module: string;
  subject: string;
  problemDescription: string;
  reminders: number;
  submittedBy: string;
  submittedOn: Date;
  oasisComments: string;
  closedBy: string;
  closedOn: Date;
  approvedBy: string;
  approvedOn: Date;
  attachments: NzUploadFile[];

}
