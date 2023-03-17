import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TaskService } from '..//task/task.service';
import { Task } from '..//task/task.schema';
import { CreateTaskDto } from '../task/dto/CreateTask.dto';
import { GetTasksFilterDto } from '..//task/dto/GetTaskFilter.dto';

import {
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from '..//task/dto/UpdateTask.dto';
import { User } from '..//user/user.decorator';

import { Auth } from '..//auth/auth.decorator';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @Auth()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @User('_id') userId,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, userId);
  }

  @Get('/:id')
  @Auth()
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post('')
  @HttpCode(200)
  @Auth()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @User('_id') userId: string,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, userId);
  }

  @Delete('/:id')
  @Auth()
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Patch('/update/:id')
  @Auth()
  updateTask(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, dto);
  }

  @Patch('/update-status/:id')
  @Auth()
  updateTaskStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, dto);
  }
}
