import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRequest } from '../interfaces/request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    // if for some reason the JWT strategy didn't attach a user, deny access
    if (!user) return false;

    return requiredRoles.includes(user.role);
  }
}
