import { JarvisModule } from './jarvis.module';

describe('JarvisModule', () => {
  let jarvisModule: JarvisModule;

  beforeEach(() => {
    jarvisModule = new JarvisModule();
  });

  it('should create an instance', () => {
    expect(jarvisModule).toBeTruthy();
  });
});
