import { MessageSeverity } from './alert-enums';

export class AlertMessage {
  constructor(public severity: MessageSeverity, public summary: any, public detail: string) { }
}
