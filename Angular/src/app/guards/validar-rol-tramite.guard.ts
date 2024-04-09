import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidarRolTramiteGuard {

    constructor(private authService: AuthService, private router: Router) { }

    canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {

        const platformRoutes = {
            "1": "",
            "2": "/mobile",
            "3": "/desktop"
            // Agrega aquí más rutas según sea necesario
        };

        const roleRoutes = {
            "1": "/dashboard",
            "2": "/admin",
            "3": "/guest"
            // Agrega aquí más rutas según sea necesario
        };
        const expectedRoles = route.data['expectedRoles'] as number[];
        const expectedPlatforms = route.data['expectedPlatforms'] as number[];

        return this.authService.isAuthenticated().pipe(
            switchMap((authenticated: boolean) => {
                if (authenticated) {
                    return this.authService.getCurrentUser();
                } else {
                    console.log('Usuario no autenticado. Redirigiendo a la página de inicio de sesión...');
                    this.router.navigateByUrl('/auth/login');
                    return of(false);
                }
            }),
            map(currentUser => {
                // Verificar si el usuario tiene al menos uno de los roles requeridos
                const hasRequiredRole = expectedRoles.some(role => currentUser.role_id === role);
                let hasRequiredPlatform = true;
                if (expectedPlatforms) {
                    hasRequiredPlatform = expectedPlatforms.some(platform => currentUser.department_id === platform);
                }
                if (hasRequiredRole && hasRequiredPlatform) {
                    return true;
                } else {
                    // Redirigir según sea necesario
                    console.log(`Usuario no tiene permisos para acceder a esta ruta. Redirigiendo a la página de inicio correspondiente...`);
                    const redirectRoute = currentUser.role_id === 1 ? roleRoutes[currentUser.role_id.toString()]
                        : `${roleRoutes[currentUser.role_id.toString()]}${platformRoutes[currentUser.department_id]}`;

                    this.router.navigateByUrl(redirectRoute);
                    return false;
                }
            }),
            catchError(() => {
                console.log('Error al verificar la autenticación. Redirigiendo a la página de inicio de sesión...');
                this.router.navigateByUrl('/auth/login');
                return of(false);
            })
        );
    }
}
