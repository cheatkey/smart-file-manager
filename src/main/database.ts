import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  Default,
  BelongsToMany,
  HasMany,
} from '@sequelize/core/decorators-legacy';

export class FileModel extends Model<
  InferAttributes<FileModel>,
  InferCreationAttributes<FileModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare storedName: string;

  @Attribute(DataTypes.DATE)
  declare createdAt: Date;

  @Attribute(DataTypes.STRING)
  declare fileName: string;

  @Attribute(DataTypes.STRING)
  declare metadata: string;

  @Attribute(DataTypes.STRING)
  declare memo: string;

  @BelongsToMany(() => TagModel, {
    through: 'FileTag',
  })
  declare tags?: NonAttribute<TagModel[]>;

  @HasMany(() => ThumbnailModel, 'thumbnailID')
  declare thumbnails?: NonAttribute<ThumbnailModel[]>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare groupID?: number;
}

export class TagModel extends Model<
  InferAttributes<TagModel>,
  InferCreationAttributes<TagModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare tagName: string;
}

export class ThumbnailModel extends Model<
  InferAttributes<ThumbnailModel>,
  InferCreationAttributes<ThumbnailModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare image: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare thumbnailID: number;
}

export class GroupModel extends Model<
  InferAttributes<GroupModel>,
  InferCreationAttributes<GroupModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare groupName: string;

  @HasMany(() => FileModel, 'groupID')
  declare files?: NonAttribute<FileModel[]>;
}

export class HistoryModel extends Model<
  InferAttributes<HistoryModel>,
  InferCreationAttributes<HistoryModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare historyName: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare version: number;

  @BelongsToMany(() => FileModel, {
    through: 'FileHistory',
  })
  declare files?: NonAttribute<FileModel[]>;
}

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  models: [FileModel, TagModel, ThumbnailModel, GroupModel, HistoryModel],
});

export const test = async () => {
  const createdFile = await FileModel.create({
    createdAt: new Date(),
    memo: '메모입니다.',
    fileName: '테스트 파일',
    metadata: '{}',
    storedName: '저장된 파일',
  });
};
