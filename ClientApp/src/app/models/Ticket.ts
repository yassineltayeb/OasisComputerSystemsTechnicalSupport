import { NzUploadFile } from 'ng-zorro-antd/upload';

export interface Ticket {
  assignedTo: string;
  clientID: number;
  type: string;
  priority: string;
  module: string;
  subject: string;
  problemDescription: string;
  submittedBy: string;
  attachments: NzUploadFile[];
}
