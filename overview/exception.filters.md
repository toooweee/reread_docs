# Exception filters

Nest предоставляется со встроенным слоем исключений, который отвечает за обработку всех необработанных исключений. Когда исключение не обрабатывается кодом вашего приложения, оно перехватывается этим уровнем, который затем автоматически отправляет соответствующий удобный для пользователя ответ.

Из коробки глобальный фильтр исключений обрабатывает ошибки типа `HttpException` (и его подклассы). Если ошибка иного типа, выбрасывается response вида:

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

### Exception filters

```typescript
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

Давайте взглянем на параметры метода `catch`:

- `exception`: Это объект или объекты ошибки, обрабатываемых в данный момент
- `host`: Это объект `ArgumentHost`. В этом примере кода мы используем его для получения ссылки на запрос и ответ