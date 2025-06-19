# Middleware 

Middleware - это функции, которые вызываются перед обработчиком маршрута

Могут выполнять следующие задачи: 

1. Выполнить любой код
2. Внести изменения в объекты request и response
3. Завершить цикл запроса-ответа
4. Вызвать следующий middleware в стэке
5. Если текущая функция промежуточного программного обеспечения не завершает цикл запрос-ответ, она должна вызвать `next()`, чтобы передать управление следующей функции промежуточного программного обеспечения. В противном случае запрос останется зависшим.

Пользовательские Nest middleware реализуются либо в функции, либо в классе с декоратором `@Injectable()`. Класс должен реализовывать `NestMiddleware` интерфейс, в то время к функции нет таких требований.  

### Использование

Чтобы использовать Middleware, мы настраиваем их в методе `configure()`, модуля. Модули, которые хотят использовать Middleware, должны имплементировать `NestModule` interface. 

Также можно ограничить, к каким роутам будет применяться Middleware. Для этого нужно передать объект, содержащий путь запроса и метод запроса, методу `forRoutes()`. 

```typescript

import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
```

### Wildcards

Если что `cats/` в wildcard не входит. Если есть желание чтобы и `cats/` туда попадал, то `cats/${*}`
```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats/*', method: RequestMethod.ALL });
  }
}
```

### Middleware consumer

`Middleware consumer` - потребитель промежуточного ПО. Это вспомогательный класс, который предоставляет несколько встроенных методов для управления Middleware.

### Global using

Если мы хотим привязать промежуточное программное обеспечение сразу к каждому зарегистрированному маршруту, мы можем использовать метод use(), который предоставляется экземпляром INestApplication:

```typescript
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(process.env.PORT ?? 3000);
```

