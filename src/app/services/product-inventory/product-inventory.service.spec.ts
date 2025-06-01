import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProductInventoryService } from './product-inventory.service';
import { RegisterProductInventory } from 'src/app/models/register-product-inventory';

describe('ProductInventoryService', () => {
  let service: ProductInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductInventoryService],
    });
    service = TestBed.inject(ProductInventoryService);
  });

  it('debería obtener la lista de inventarios de productos', (done) => {
    service.getProductInventories().subscribe(
      (inventories) => {
        expect(inventories.length).toBeGreaterThan(0);
        console.log('Lista de inventarios de productos obtenida:', inventories);
        done();
      },
      (error) => {
        fail('Error al obtener la lista de inventarios de productos: ' + error.message);
        done();
      }
    );
  });

  it('debería agregar un nuevo inventario de producto', (done) => {
    const newProductInventory: RegisterProductInventory = {
      productoId: 1,
      cantidad: 100,
    };

    service.addProductInventory(newProductInventory).subscribe(
      (inventory) => {
        expect(inventory).toBeTruthy();
        console.log('Inventario de producto agregado:', inventory);
        done();
      },
      (error) => {
        fail('Error al agregar el inventario de producto: ' + error.message);
        done();
      }
    );
  });
});