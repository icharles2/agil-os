import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarsController {
    @Get()
    getAll() {
        return {status: 'hello world'};
    }
}
