import { Component, OnInit } from '@angular/core';
import { ActiveTickets } from 'src/app/models/ActiveTickets';
import { ActiveTicketsStatus } from 'src/app/models/ActiveTicketsStatus';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { TicketStatus } from 'src/app/models/TicketStatus';
import { TicketStatusColors } from 'src/app/models/TicketStatusColors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];

  activeTickets: ActiveTickets[] = [];
  activeTicketsStatus: ActiveTicketsStatus[] = [];
  ticketsStatus: ActiveTicketsStatus[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getActiveTickets().subscribe((result: ActiveTickets[]) => {
      this.activeTickets = result;
    });

    this.pieChartLabels = [];
    this.pieChartData = [];
    this.pieChartColors[0].backgroundColor = [];

    // Get Tickets Status
    this.ticketService.getTicketsStatus().subscribe((result: ActiveTicketsStatus[]) => {
      this.ticketsStatus = result;
      console.log('thisticketsStatus', this.ticketsStatus);
    });

    // Get Active Tickets Status
    this.ticketService.getActiveTicketsStatus().subscribe((result: ActiveTicketsStatus[]) => {
      this.activeTicketsStatus = result;
      this.activeTicketsStatus.forEach((item: ActiveTicketsStatus) => {
        this.pieChartLabels.push(item.status);
        this.pieChartData.push(item.noOfTickets);
        this.pieChartColors[0].backgroundColor.push(this.getStatusColor(item.status));
      });
    });
  }

  getStatusCount(status: string): number {
    console.log('statusSent', status);

    let count = 0;
    this.ticketsStatus.forEach((item: ActiveTicketsStatus) => {
      console.log('status', item.status);

      if (item.status === status) {
        count = item.noOfTickets;
      }
    });

    return count;
  }

  getStatusColor(status: string): string {
    if (status === TicketStatus.WAITING) {
      return TicketStatusColors.WAITING;
    } else if (status === TicketStatus.REOPENED) {
      return TicketStatusColors.REOPENED;
    } else if (status === TicketStatus.WORK_IN_PROGRESS) {
      return TicketStatusColors.WORK_IN_PROGRESS;
    } else if (status === TicketStatus.PENDING_DELIVERY) {
      return TicketStatusColors.PENDING_DELIVERY;
    } else if (status === TicketStatus.PENDING_ON_CUSTOMER) {
      return TicketStatusColors.PENDING_ON_CUSTOMER;
    }
  }

}
