export interface TicketsParameters {
  clientId: number;
  fullName: string;
  module: string[];
  accountManager: string[];
  assignedTo: string[];
  status: string[];
  type: string[];
  notApproved: boolean;
  highPriority: boolean;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  IsSortAscending: boolean;
}
