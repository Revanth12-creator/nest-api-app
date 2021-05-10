import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';


@Injectable()
export class OrderDetailsService {

  constructor(
    @InjectRepository(OrderDetail) private orderDetailsRepository: Repository<OrderDetail>,
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService
  ) { }

  async create(uId: string, orderId: number, productId: number, createOrderDetailDto: CreateOrderDetailDto) {
    try {
      const user1 = await this.userService.findById(uId);
      const order1 = await this.orderService.findOne(orderId);
      const product1 = await this.productService.findOne(productId);
      return this.orderDetailsRepository.save({
        quantity: createOrderDetailDto.qty,
        user1,
        order1,
        product1
      });
    } catch (err) {
      console.log(err)
    }
  }

  findAll() {
    return `This action returns all orderDetails`;
  }

  findOne(id: number,) {
    return this.orderDetailsRepository.findOne(id)
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsRepository.update(id, {
      quantity: updateOrderDetailDto.qty
    });
  }

  remove(id: number) {
    return this.orderDetailsRepository.delete(id);
  }
}
