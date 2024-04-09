import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs';

export const validarAdminGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validarAdmin()
        .pipe(tap( valid => {
          if(!valid){
            router.navigateByUrl('/auth/login');
          }
      }))
};
