import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AlertMessage, AlertDialog, DialogType, MessageSeverity } from '../../../services/alert/index';

@Injectable()
export abstract class BaseAlertService {

  protected loadingMessageId: any;
  protected messages = new Subject<AlertMessage>();
  protected stickyMessages = new Subject<AlertMessage>();
  protected dialogs = new Subject<AlertDialog>();
  protected isLoading = false;
  public genericErrorMessage = 'Please try again.';
  public noDataMessage = 'No Data.';


  //constructor(http: Http, router: Router) {}
  public abstract showDialog(message: string): void;
  public abstract showDialog(message: string, type: DialogType, okCallback: (val?: any) => any): void;
  public abstract showDialog(message: string, type: DialogType, okCallback?: (val?: any) => any, cancelCallback?: () => any,
                              okLabel?: string, cancelLabel?: string, defaultValue?: string): void;
  public abstract showDialog(message: string, type?: DialogType, okCallback?: (val?: any) => any, cancelCallback?: () => any,
                              okLabel?: string, cancelLabel?: string, defaultValue?: string): void;
  public abstract showMessage(summary: string): void;
  public abstract showMessage(summary: string, detail: string, severity: MessageSeverity): void;
  public abstract showMessage(summaryAndDetails: string[], summaryAndDetailsSeparator: string, severity: MessageSeverity): void;
  public abstract showMessage(response: Response, ignoreValueUseNull: string, severity: MessageSeverity): void;
  public abstract showMessage(data: any, separatorOrDetail?: string, severity?: MessageSeverity): void;
  public abstract showStickyMessage(summary: string): void;
  public abstract showStickyMessage(summary: string, detail: string, severity: MessageSeverity, error?: any): void;
  public abstract showStickyMessage(summaryAndDetails: string[], summaryAndDetailsSeparator: string, severity: MessageSeverity): void;
  public abstract showStickyMessage(response: Response, ignoreValueUseNull: string, severity: MessageSeverity): void;
  public abstract showStickyMessage(data: string | string[] | Response, separatorOrDetail?: string,
                                      severity?: MessageSeverity, error?: any): void;
  public abstract showMessageHelper(summary: string | string[] | Response, detail: string,
                                      severity: MessageSeverity, isSticky: boolean): void;
  public abstract startLoadingMessage(message: string, caption: string): void;
  public abstract stopLoadingMessage(): void;
  protected abstract logDebug(msg: string): void;
  protected abstract logError(msg: string): void;
  protected abstract logInfo(msg: string): void;
  protected abstract logMessage(msg: string): void;
  protected abstract logTrace(msg: string): void;
  protected abstract logWarning(msg: string): void;
  protected abstract resetStickyMessage(): void;
  protected abstract getDialogEvent(): Observable<AlertDialog>;
  public abstract getMessageEvent(): Observable<AlertMessage>;
  public abstract getStickyMessageEvent(): Observable<AlertMessage>;
}
