import {
  Controller,
  Get,
  Header,
  Post,
  Req,
  Res,
  Headers,
  Redirect,
  Param,
  ParseIntPipe,
  Body,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get()
  findAllWithQueries(@Query('age') age: number, @Query('breed') breed: string) {
    return 'This action returns all cats with query';
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  // Когда мы хотим использовать экспресс штуки, то обязательно:
  // passthrough: true
  @Get()
  findAllPassthrough(@Res({ passthrough: true }) response: Response) {
    response.status(HttpStatus.OK);
    return [];
  }

  // динамические параметры (id)
  // объявляем их после всех статических путей, иначе не ворк
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): void {
    console.log(id);
  }

  // Установка заголовков ответа
  @Post()
  @Header('Cache-Control', 'no-store')
  createCache(): string {
    return 'This action has access to headers';
  }

  @Get('headers')
  getHeaders(@Headers() headers: Record<string, string>): string {
    console.log(headers['user-agent']);
    return 'This action returns all headers';
  }

  // redirect
  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {
    console.log('redirecting');
    // Я на самом деле думаю это через res.redirect делать лучше.
    // типо сервис возвращает юрл, и туда делаем res.redirect

    // Хотя есть и пример, что возвращаемые значения переопределяют редирект
    // в декораторе, но не знаю, мы же можем не только юрл возвращать, верно?
  }

  // may get express request object from request
  @Get('express/:id')
  findAllExpress(@Req() request: Request, @Res() res: Response) {
    console.log(request.params);
    return res.status(200).json({
      params: request.params,
    });
  }

  // route wildcards
  @Get('abcd/*')
  findAnyAll(): string {
    return 'To get to this function u may type abcd/rqw or ...';
  }

  // async
  @Get('async')
  async find(): Promise<number[]> {
    return [1, 2, 3];
  }
}
