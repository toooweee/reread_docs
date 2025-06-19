import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto): Cat {
    this.cats.push(createCatDto);
    return createCatDto;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);

    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }

    return cat;
  }
}
