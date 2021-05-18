import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {

    @ApiProperty()
    cardUName: string;

    @ApiProperty()
    cardNo: number;

    // @ApiProperty()
    // exDate: string;

    @ApiProperty()
    cvv: number;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    product: number;

    @ApiProperty()
    order: number;
}
