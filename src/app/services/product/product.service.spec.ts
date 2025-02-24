import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RegisterProduct } from 'src/app/models/register-producto';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
  });

  it('debería obtener la lista de productos', (done) => {
    service.getProducts().subscribe(
      (products) => {
        expect(products.length).toBeGreaterThan(0);
        console.log('Lista de productos obtenida:', products);
        done();
      },
      (error) => {
        fail('Error al obtener la lista de productos: ' + error.message);
        done();
      }
    );
  });

  it('debería agregar un nuevo producto', (done) => {
    const newProduct: RegisterProduct = {
      nombre: 'Producto A',
      descripcion: 'Descripción del producto',
      precio: '100',
      proveedorId: 1,
      categoriaId: 1,
    };

    const blob = new Blob(['dummy content'], { type: 'image/png' });
    const fakeFile = new File([blob], 'test-image.png', { type: 'image/png' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(fakeFile);
    const image = dataTransfer.files;

    service.addProduct(newProduct, image).subscribe(
      (product) => {
        expect(product).toBeTruthy();
        console.log('Producto agregado:', product);
        done();
      },
      (error) => {
        fail('Error al agregar el producto: ' + error.message);
        done();
      }
    );
  });
});
