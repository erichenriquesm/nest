import { Test, TestingModule } from '@nestjs/testing';
import { SubTaskService } from './sub-task.service';

describe('SubTasks', () => {
  let provider: SubTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubTaskService],
    }).compile();

    provider = module.get<SubTaskService>(SubTaskService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
