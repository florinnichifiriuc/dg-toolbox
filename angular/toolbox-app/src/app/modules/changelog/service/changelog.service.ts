import {ChangeDetectorRef, ElementRef, EventEmitter, inject, Injectable} from '@angular/core';
import {Subscriber} from "rxjs";
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'platform'
})
export class ChangelogService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private _installUpdateEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  checkForUpdate(changeDetector: ChangeDetectorRef, changeObserver: Subscriber<boolean>): void {
    changeObserver.next(this.localStorageService.get(LocalStorageKeys.LOCAL_VERSION) !=
      this.localStorageService.get(LocalStorageKeys.REMOTE_VERSION, false));

    changeObserver.complete();
    changeDetector.detectChanges();
  }

  showComponent(loadSpinner: ElementRef): void {
    if (loadSpinner.nativeElement && loadSpinner.nativeElement.classList.contains('show')) {
      loadSpinner.nativeElement.classList.add('hide');
      loadSpinner.nativeElement.classList.remove('show');
    }
  }

  get installUpdateEmitter(): EventEmitter<boolean> {
    return this._installUpdateEmitter;
  }
}
