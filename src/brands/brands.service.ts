import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [{
    id: uuid(),
    name: 'Toyota',
    createdAt: Date.now()
  }]

  create(createBrandDto: CreateBrandDto) {

    const { name } = createBrandDto;
    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime()
    }

    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`BrandId ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDB = {
          ...brandDB,
          ...updateBrandDto,
          id,
          updatedAt: Date.now()
        };
        return brandDB;
      }
      return brand;
    })

    return brandDB;
  }

  remove(id: string) {
    const foundBrand = this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== foundBrand.id)
  }
}