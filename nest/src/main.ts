import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();



// მოგესალმებით თქვენი დავალება შემდეგია, გააკეთოთ ნესტის აპლიკაცია სადაც გექნებათ  შემდეგი მოდულები სრულად graphql-ზე:
// /auth
// /users
// /posts.

// უნდა გააკეთო რეგისტრაცია ავტორიზაცია და პოსტების მოდული უნდა იყოს ფროთექთედ ანუ მხოლოდ ავტორიზირებულ იუზერებს უნდა შეეძლოთ დარექუესთება და ქრადის ტიპის ოპერაციების ჩატარება.

// მოთხოვნები: GraphQL, Mongoose, Nestjs, JWT. 
// რეფერენსი: https://github.com/Datodia/nest-gql