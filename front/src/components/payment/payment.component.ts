import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../../services/payment-service/payment.service';
import {dialogText} from '../../util/popupTextInput';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent implements OnInit {
  wallet = null;
  history : Transaction[] = [];

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.updateWallet();
    this.getHistory();
  }

  updateWallet() {
    this.paymentService.getWallet().subscribe({
      next: (response) => {
        this.wallet = response.wallet;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du wallet', err);
      }
    });
  }

  async depositFunds() {
    let amount = await dialogText('Dépôt de fonds', 'Saisir le montant à déposer');
    if (amount == null) {
      return;
    }
    if (Number(amount) >= 10) {
      this.paymentService.pay(Number(amount), 'deposit').subscribe({
        next: () => {
          this.updateWallet();
          this.getHistory();
        },
        error: (err) => {
          console.error('Erreur lors du Dépôt :', err);
        }
      });
    } else {
      alert('Le montant doit être supérieur à 10€');
    }
  }

  async withdrawalFunds() {
    let amount = await dialogText('Retrait de fonds', 'Saisir le montant à retirer');
    if (amount == null) {
      return;
    }
    if (Number(amount) >= 10) {
      this.paymentService.pay(Number(amount), 'withdrawal').subscribe({
        next: () => {
          this.updateWallet();
          this.getHistory();
        },
        error: (err) => {
          if (err.status == '405') {
            alert('Solde insuffisant');
          }
          console.error('Erreur lors du retrait :', err);
        }
      });
    } else {
      alert('Le montant doit être supérieur à 10€');
    }
  }

  getHistory() {
    this.paymentService.history().subscribe({
      next: (response) => {
        this.history = response;
        this.history.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'historique', err);
      }
    });
  }
}

interface Transaction {
  createdAt: string;
  amount: number;
  type: string;
}
