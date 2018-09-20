import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BaseAlertService } from '../../base/index';
import { Utilities } from '../application/utilities';
import { AlertMessage, AlertDialog, DialogType, MessageSeverity } from './index';

@Injectable()
export class AlertService extends BaseAlertService {

  constructor() {
    super();
  }

  showDialog(message: string, type?: DialogType, okCallback?: (val?: any) => any, cancelCallback?: () => any,
              okLabel?: string, cancelLabel?: string, defaultValue?: string): void {
    if (!type)
      type = DialogType.alert;
    this.dialogs.next({ message: message, type: type, okCallback: okCallback, cancelCallback: cancelCallback,
                        okLabel: okLabel, cancelLabel: cancelLabel, defaultValue: defaultValue });
  }

  showMessage(data: any, separatorOrDetail?: string, severity?: MessageSeverity): void {

    if (!severity)
      severity = MessageSeverity.default;

    if (data instanceof Response) {
      data = Utilities.getHttpResponseMessage(data);
      separatorOrDetail = Utilities.captionAndMessageSeparator;
    }

    if (data instanceof Array) {
      for (let message of data) {
        let msgObject = Utilities.splitInTwo(message, separatorOrDetail);

        this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
      }
    } else {
      this.showMessageHelper(data, separatorOrDetail, severity, false);
    }
  }

  showStickyMessage(data: string | string[] | Response, separatorOrDetail?: string, severity?: MessageSeverity, error?: any): void {
    if (!severity)
      severity = MessageSeverity.default;

    if (data instanceof Response) {
      data = Utilities.getHttpResponseMessage(data);
      separatorOrDetail = Utilities.captionAndMessageSeparator;
    }

    if (data instanceof Array) {
      for (let message of data) {
        let msgObject = Utilities.splitInTwo(message, separatorOrDetail);

        this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
      }
    } else {

      if (error) {

        let msg = `Severity: "${MessageSeverity[severity]}", Summary: "${data}",
                    Detail: "${separatorOrDetail}", Error: "${Utilities.safeStringify(error)}"`;

        switch (severity) {
          case MessageSeverity.default:
            this.logInfo(msg);
            break;
          case MessageSeverity.info:
            this.logInfo(msg);
            break;
          case MessageSeverity.success:
            this.logMessage(msg);
            break;
          case MessageSeverity.error:
            this.logError(msg);
            break;
          case MessageSeverity.warn:
            this.logWarning(msg);
            break;
          case MessageSeverity.wait:
            this.logTrace(msg);
            break;
        }
      }
      this.showMessageHelper(data, separatorOrDetail, severity, true);
    }
  }

  showMessageHelper(summary: string | string[] | Response, detail: string, severity: MessageSeverity, isSticky: boolean): void {
    if (isSticky)
      this.stickyMessages.next({ severity: severity, summary: summary, detail: detail });
    else
      this.messages.next({ severity: severity, summary: summary, detail: detail });
  }

  startLoadingMessage(message = 'Loading...', caption = ''): void {
    this.isLoading = true;
    clearTimeout(this.loadingMessageId);

    this.loadingMessageId = setTimeout(() => {
      this.showStickyMessage(caption, message, MessageSeverity.wait);
    }, 1000);
  }

  stopLoadingMessage(): void {
    this.isLoading = false;
    clearTimeout(this.loadingMessageId);
    this.resetStickyMessage();
  }

  logDebug(msg: string): void {
    console.debug(msg);
  }

  logError(msg: string): void {
    console.error(msg);
  }

  logInfo(msg: string): void {
    console.info(msg);
  }

  logMessage(msg: string): void {
    console.log(msg);
  }

  logTrace(msg: string): void {
    console.trace(msg);
  }

  logWarning(msg: string): void {
    console.warn(msg);
  }

  resetStickyMessage(): void {
    this.stickyMessages.next();
  }

  getDialogEvent(): Observable<AlertDialog> {
    return this.dialogs.asObservable();
  }

  getMessageEvent(): Observable<AlertMessage> {
    return this.messages.asObservable();
  }

  getStickyMessageEvent(): Observable<AlertMessage> {
    return this.stickyMessages.asObservable();
  }

  get isLoadingInProgress(): boolean {
    return this.isLoading;
  }
}
