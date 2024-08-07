import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy/busy.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const busyService = inject(BusyService);
  busyService.busy();

  return next(req).pipe(finalize(() => busyService.idle())
  );
}; 
