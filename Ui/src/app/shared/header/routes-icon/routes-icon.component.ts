import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-routes-icon',
  templateUrl: './routes-icon.component.html',
  styleUrls: ['./routes-icon.component.scss'],
})
export class RoutesIconComponent {
  @Input() icon!: IconProp;
  @Input() text!: string;
}
