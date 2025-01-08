import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {PaymentService} from '../../services/payment-service/payment.service';
import {dialogText} from '../../util/popupTextInput';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  wallet = null;
  token: string = '';

  constructor(private authService: AuthService, private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.updateWallet();
  }

  updateWallet() {
    this.paymentService.getWallet(this.token).subscribe({
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
    if (Number(amount) >= 10) {
      this.paymentService.pay(this.token, Number(amount), 'deposit').subscribe({
        next: (response) => {
          console.log('Dépôt réussi :', response);
          this.updateWallet();
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
    if (Number(amount) >= 10) {
      this.paymentService.pay(this.token, Number(amount), 'withdrawal').subscribe({
        next: (response) => {
          console.log('Retrait réussi :', response);
          this.updateWallet();
        },
        error: (err) => {
          console.error('Erreur lors du retrait :', err);
        }
      });
    } else {
      alert('Le montant doit être supérieur à 10€');
    }
  }
}
