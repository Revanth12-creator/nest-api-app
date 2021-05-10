import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {

    @ApiProperty({ required: true })
    amount: number;

    @ApiProperty({ required: true })
    mode: string;

    @ApiProperty({ required: true })
    order1: number;

}
