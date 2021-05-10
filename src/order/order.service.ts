import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Like, Repository } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { UserService } from 'src/auth/user/user.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';


@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UserService,
    private productService: ProductService
  ) { }


  async create(id: string, pid: number, createOrderDto: CreateOrderDto) {
    try {
      const user = await this.userService.findById(id);
      const product = await this.productService.findOne(pid);
      return this.orderRepository.save({
        orderAmount: createOrderDto.amount,
        orderShippingDate: createOrderDto.OSDate,
        orderQty: createOrderDto.qty,
        user,
        product
      });
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return
    this.orderRepository.findOne(id)
      .then((data) => {
        console.log(data);
        if (!data) throw new NotFoundException();
        return data;
      });
  }


  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      //const product = await this.productService.findOne(id);
      return this.orderRepository
        .update(id, {
          orderAmount: updateOrderDto.amount,
          orderShippingDate: updateOrderDto.OSDate,
        })
    } catch (err) {
      console.log(err)
    }
  }

  remove(id: number) {
    return this.orderRepository.delete({ orderId: id });
  }
}
