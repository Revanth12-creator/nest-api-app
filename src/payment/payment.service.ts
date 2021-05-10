import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Like, Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/auth/user/user.service';


@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private orderService: OrderService,
  ) { }

  async create(oId: number, createPaymentDto: CreatePaymentDto) {
    try {
      const order1 = await this.orderService.findAll();
      console.log(order1)
      return this.paymentRepository.save({
        paymentAmount: createPaymentDto.amount,
        paymentMode: createPaymentDto.mode,
        order1
      });
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return this.paymentRepository.find();
  }

  findOne(id: number) {
    return this.paymentRepository.findOne(id)
      .then((data) => {
        if (!data) throw new NotFoundException();
      });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(id,
      {
        paymentAmount: updatePaymentDto.amount,
        paymentMode: updatePaymentDto.mode
      });
  }

  remove(id: number) {
    return this.paymentRepository.delete(id);
  }
}
