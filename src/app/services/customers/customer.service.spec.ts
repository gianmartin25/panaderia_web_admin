import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CustomerService],
    });
    service = TestBed.inject(CustomerService);
  });

  it('debería obtener la lista de clientes', (done) => {
    service.getCustomers().subscribe(
      (customers) => {
        expect(customers.length).toBeGreaterThan(0);
        console.log('Lista de clientes obtenida:', customers);
        done();
      },
      (error) => {
        fail('Error al obtener la lista de clientes: ' + error.message);
        done();
      }
    );
  });
});
