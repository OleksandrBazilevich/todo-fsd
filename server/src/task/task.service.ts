import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTaskDto } from '../k/dto/CreateTask.dto';
import { GetTasksFilterDto } from '../k/dto/GetTaskFilter.dto';
import { UpdateTaskDto, UpdateTaskStatusDto } from '../k/dto/UpdateTask.dto';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getTasks(
    filterDto: GetTasksFilterDto,
    userId: string,
  ): Promise<Task[]> {
    const { isCompleted, search } = filterDto;
    const query = this.taskModel.find({ authorId: userId });

    if (isCompleted) {
      query.where('isCompleted').equals(isCompleted);
    }

    if (search) {
      query.where('title').regex(new RegExp(search, 'i'));
    }

    const tasks = await query.exec();
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new Error(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async getTasksByUser(id: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ authorId: id });

    if (tasks.length === 0) {
      throw new Error(`Tasks not found`);
    }

    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new this.taskModel({
      title,
      description,
      isCompleted: false,
      authorId: userId,
    });
    await task.save();
    return task;
  }

  async deleteTask(id: string) {
    const result = await this.taskModel.findByIdAndDelete({ _id: id }).exec();
    return result;
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, dto, { new: true });

    if (!task) throw new Error('task not found');
    return task;
  }

  async updateTaskStatus(id: string, dto: UpdateTaskStatusDto): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, dto, { new: true });

    if (!task) throw new Error('task not found');
    return task;
  }
}
