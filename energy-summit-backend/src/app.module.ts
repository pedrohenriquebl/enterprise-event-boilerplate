import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThemesModule } from './themes/themes.module';
import { ThemesController } from './themes/presentation/controllers/themes.controller';
import { ThemesService } from './themes/application/services/themes.service';

@Module({
  imports: [ThemesModule],
  controllers: [AppController, ThemesController],
  providers: [AppService, ThemesService],
})
export class AppModule {}
