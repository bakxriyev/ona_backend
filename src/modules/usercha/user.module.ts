import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Usercha } from "./models";
import { UserchaService } from "./user.service";
import { UserchaController } from "./user.controller";

@Module({
    imports: [SequelizeModule.forFeature([Usercha])],
    providers: [UserchaService],
    controllers: [UserchaController]
})

export class UserchaModule { }