import { Controller, Get, Param, HttpException, UsePipes } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { IDepartment } from './interfaces/department.interface';
import { ValidationPipe } from '../validation.pipe';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get('/')
  getDepartments(): Promise<any> {
    return this.departmentService.getDepartments();
  }

  @Get('/:department_id')
  @UsePipes(new ValidationPipe())
  async getDepartment(@Param() params: IDepartment): Promise<any> {
    const item = await this.departmentService.getDepartment(params.department_id);
    if (!item) {
      throw new HttpException('Department did not found', 400);
    }
    return item;
  }
}
