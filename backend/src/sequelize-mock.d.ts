declare module "sequelize-mock" {
  import { Sequelize } from "sequelize";

  export class MockQueryInterface {
    constructor(sequelize: Sequelize);
    public $queueFailure(error: Error): void;
    public $clearQueue(): void;
    public $queueResult<T>(result: T): void;
    public queryInterface: any;
    public sequelize: Sequelize;
  }

  export class MockModel {
    public static $queueFailure(error: Error): void;
    public static $clearQueue(): void;
    public static $queueResult<T>(result: T): void;
    public static findOne<T>(options?: any): Promise<T>;
    public static findAll<T>(options?: any): Promise<T[]>;
    public static create<T>(values: any, options?: any): Promise<T>;
    public static update<T>(values: any, options?: any): Promise<T[]>;
    public static destroy<T>(options?: any): Promise<number>;
    public static bulkCreate<T>(records: any[], options?: any): Promise<T[]>;
  }

  export class SequelizeMock {
    constructor(
      database?: string,
      username?: string,
      password?: string,
      options?: any
    );
    public define(
      name: string,
      attributes: any,
      options?: any
    ): typeof MockModel;
    public sync(options?: any): Promise<void>;
    public close(): void;
    public getQueryInterface(): MockQueryInterface;
  }
}
