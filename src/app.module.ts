import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

// Base configs
import { AppConfig } from "./config/app.config";
import { DatabaseConfig } from "./config/database.config";
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/users/users.module';
import { NewsModule } from './modules/news/news.module';
import { BlogModule } from './modules/blog/blog.module';
import { InsuranceModule } from './modules/insurance/insurance.module';
import { CareerModule } from './modules/careers/careers.module';
import { DoctorModule } from './modules/doctors/doctors.module';
import { DirectionModule } from './modules/direction/direction.module';
import { DirectionDoctorsModule } from './modules/direction_doctors/direction_doctors.module';
import { ResumeModule } from './modules/resume/resume.module';
import { AboutModule } from './modules/about/about.module';
import { ServiceModule } from './modules/services/services.module';
import { About } from "./modules/about/model/about.entity";
import { Admin } from "./modules/admin/model/admin.entity";
import { Blog } from "./modules/blog/model/blog.entity";
import { Career } from "./modules/careers/model/career.entity";
import { Direction } from "./modules/direction/model/direction.entity";
import { DirectionDoctors } from "./modules/direction_doctors/model/direction_doctor.entity";
import { Doctor } from "./modules/doctors/model/doctor.entity";
import { Insurance } from "./modules/insurance/model/insurance.entity";
import { News } from "./modules/news/model/news.entity";
import { Resume } from "./modules/resume/model/resume.entity";
import { Service } from "./modules/services/model/service.entity";
import { User } from "./modules/users/model/user.entity";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    // Static uploads folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),

    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig],
    }),

    // Sequelize (PostgreSQL)
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: "postgres",
        host: config.get<string>("database.host"),
        port: config.get<number>("database.port"),
        username: config.get<string>("database.username"),
        password: config.get<string>("database.password"),
        database: config.get<string>("database.database"),
        models:[About,Admin,Blog,Career,Direction,DirectionDoctors,Doctor,Insurance,News,Resume,Service,User],
        autoLoadModels: true,
        synchronize: true,
        // sync: { alter: true },
        logging: config.get<string>("app.nodeEnv") === "development",
      }),
    }),

    AdminModule,
    UserModule,
    NewsModule,
    BlogModule,
    InsuranceModule,
    CareerModule,
    DoctorModule,
    DirectionModule,
    DirectionDoctorsModule,
    ResumeModule,
    AboutModule,
    ServiceModule,
    AuthModule
    // Mailer setup
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     transport: {
    //       host: config.get<string>("MAIL_HOST"),
    //       port: parseInt(config.get<string>("MAIL_PORT") ?? "587", 10),
    //       secure: false,
    //       auth: {
    //         user: config.get<string>("MAIL_USER"),
    //         pass: config.get<string>("MAIL_PASS"),
    //       },
    //     },
    //     defaults: {
    //       from: config.get<string>("MAIL_FROM"),
    //     },
    //     template: {
    //       dir: join(__dirname, "templates"),
    //       adapter: new HandlebarsAdapter(),
    //       options: { strict: true },
    //     },
    //   }),
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
