import { Component, OnInit } from '@angular/core';
import { beClient } from 'src/axios.client';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
  emails: any[] = [];
  email: string | null = localStorage.getItem('email');

  ngOnInit(): void {
    this.fetchEmails();
  }

  async fetchEmails(): Promise<void> {
    this.emails = (await beClient.get(`/emails?email=${this.email}`)).data;
  }
}
