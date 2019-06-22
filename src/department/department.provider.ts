import { Department } from './department.entity';

export const departmentProviders = [
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useValue: Department,
  },
];
