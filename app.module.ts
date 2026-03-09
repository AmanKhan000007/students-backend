import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Student],
        synchronize: true,
        ssl: { rejectUnauthorized: false },
        logging: false,
      }),
    }),
    StudentsModule,
  ],
})
export class AppModule {}
```

---

## Step 3 — Add DATABASE_URL variable in Railway

1. Go to `students-backend` → **Variables**
2. Click **+ New Variable**
3. Name: `DATABASE_URL`
4. Go to Postgres service → **Connect** tab
5. Copy the **connection string** that looks like:
```
postgresql://postgres:password@host:port/railway