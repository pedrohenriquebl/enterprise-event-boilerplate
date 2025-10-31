import { Module } from '@nestjs/common';
import { ThemesController } from './presentation/controllers/themes.controller';
import { ThemesService } from './application/services/themes.service';

@Module({
  controllers: [ThemesController],
  providers: [ThemesService],
  exports: [ThemesService],
})
export class ThemesModule {}
