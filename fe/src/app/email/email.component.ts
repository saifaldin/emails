import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { beClient } from 'src/axios.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  email: string | null = localStorage.getItem('email');
  password: string | null = localStorage.getItem('password');
  emailDetails: any;
  replyMessage: string = '';
  replySent: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchEmail(params['_id']);
    })
  }

  async fetchEmail(emailId: string | null): Promise<void> {
    try {
      this.emailDetails = (await beClient.get(`/emails/${emailId}`)).data;
    } catch (error) {
      console.log(error);
    }
  }

  async replyToEmail(): Promise<void> {
    try {
      if (this.replyMessage) {
        const messageId = (await beClient.post('/emails', {
          email: this.email,
          password: this.password,
          destination: this.emailDetails.sender,
          subject: `Reply: ${this.emailDetails.subject}`,
          body: this.replyMessage
        })).data.MessageId;
        if (messageId) {
          this.replySent = true;
          interval(2000).subscribe(() => {
            this.replyMessage = '';
            this.replySent = false;
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
