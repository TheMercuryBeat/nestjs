import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/cars.interface';
import { v4 as uuid } from "uuid";
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find((car) => car.id === id);
        if (!car) throw new NotFoundException(`CarId ${id} not found`);
        return car;
    }

    create(createCarDto: CreateCarDto): Car {
        const car: Car = { id: uuid(), ...createCarDto };
        this.cars.push(car);
        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto): Car {

        let carDB = this.findOneById(id);

        this.cars = this.cars.map((car) => {
            if (car.id === id) {
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB
            }
            return car;
        })

        return carDB;
    }

    delete(id: string) {
        const foundCar = this.findOneById(id);
        this.cars = this.cars.filter((car) => car.id !== foundCar.id)
    }

    fillCarsWithSeedData(cars: Car[]){
        this.cars = cars;
    }

}
