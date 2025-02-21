import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RegisterEmployee } from '../../models/register-employee';
import { EmpleadoService } from './employee.service';

describe('EmpleadoService', () => {
  let service: EmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EmpleadoService],
    });
    service = TestBed.inject(EmpleadoService);
  });

  it('debería obtener la lista de empleados', (done) => {
    service.getEmployees().subscribe(
      (employees) => {
        expect(employees.length).toBeGreaterThan(0);
        console.log('Lista de empleados obtenida:', employees);
        done();
      },
      (error) => {
        fail('Error al obtener la lista de empleados: ' + error.message);
        done();
      }
    );
  });

  it('debería agregar un nuevo empleado', (done) => {
    const newEmployee: RegisterEmployee = {
      nombres: 'John',
      apellidos: 'Doe',
      documento: '12345678',
      tipoDocumento: 1,
      fechaContratacion: new Date(),
      fechaNacimiento: new Date('1990-01-01'),
      idCargoEmpleado: 1,
    };

    service.addEmployee(newEmployee).subscribe(
      (employee) => {
        expect(employee).toBeTruthy();
        console.log('Empleado agregado:', employee);
        done();
      },
      (error) => {
        fail('Error al agregar el empleado: ' + error.message);
        done();
      }
    );
  });
});
