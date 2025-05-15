# Config

Чтобы загрузить переменные окружения до того, как поднимется приложение, можно использовать  `--env-file`:

```shell
nest start --env-file .env
```

Если мы хотим юзать массив переменных окружения при настройке, то приоритет будет иметь первый из них:

```typescript
ConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env.development']
})
```