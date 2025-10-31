import { Controller, Get } from '@nestjs/common';
import { ThemesService } from 'src/themes/application/services/themes.service';
import type { Theme } from 'src/themes/application/services/themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  async getThemes(): Promise<Theme[]> {
    return await this.themesService.findAll();
  }
}
