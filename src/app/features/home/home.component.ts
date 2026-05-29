import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '~shared/components/card/card.component';
import { LEAD_URLS } from '~core/constants/urls.constants';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly leadCaptureUrl = LEAD_URLS.capture;
}
