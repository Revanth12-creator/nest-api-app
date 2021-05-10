import { type } from 'node:os';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne, ManyToMany } from "typeorm";

@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn()
    paymentId: number;

    @Column({ default: 0, type: "decimal", precision: 10 })
    paymentAmount: number;

    @Column({ type: "datetime", default: () => 'CURRENT_TIMESTAMP' })
    paymentDate: Date;

    @Column({ default: 'pending' })
    paymentStatus: string;

    @Column({ default: 'cash' })
    paymentMode: string;

    @ManyToOne(() => Order, (order) => order.orderId)
    @JoinColumn({ name: 'orderId' })
    order: Order[];


}
