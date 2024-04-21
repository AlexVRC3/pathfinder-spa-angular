import { Component, EventEmitter, Input, Output } from '@angular/core';
import  confetti  from 'canvas-confetti';

@Component({
  selector: 'app-modal-end-route-complete',
  templateUrl: './modal-end-route-complete.component.html',
  styleUrls: ['./modal-end-route-complete.component.css']
})
export class ModalEndRouteCompleteComponent {
  private intervalConfetti: any;
  @Output() private hasPressedBtn: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  
  constructor() {
    this.intervalConfetti = setInterval(()=> this.runConfetti(), 40);
  }

  private runConfetti(): void {
    const colors: Array<string> = ['#e6c17e', '#ffffff'];
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });
  }

  public exit(): void{
    if (this.intervalConfetti) clearInterval(this.intervalConfetti);
    this.hasPressedBtn.emit(true);
  }

}
