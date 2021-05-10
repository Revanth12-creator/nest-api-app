import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {
    @ApiProperty()
    qty: number;


    @ApiProperty()
    userd: string;

    @ApiProperty()
    order: number;

    @ApiProperty()
    product: number;
}
