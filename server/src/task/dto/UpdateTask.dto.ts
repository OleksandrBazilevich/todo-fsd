import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateTaskStatusDto {
  @IsBoolean()
  isCompleted: boolean;
}
