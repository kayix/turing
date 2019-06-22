import { Inject, Injectable } from '@nestjs/common';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private readonly departmentRepository: typeof Department,
  ) {}

  async getDepartments(): Promise<any> {
    return this.departmentRepository.findAll();
  }

  async getDepartment(id): Promise<any> {
    return this.departmentRepository.findOne({ where: { department_id: id } });
  }
}
