import * as tf from '@tensorflow/tfjs-node-gpu';
import { load } from '@tensorflow-models/mobilenet';
import fs from 'fs';
import { repository } from './database';
import { getBase64Image, getStorePath } from './ipcController';
import { isNil } from 'lodash';

const getImageEmbedding = async (imagePath: string) => {
  const thumbnailPath = getStorePath().thumbnailPath;

  const image = fs.readFileSync(`${thumbnailPath}/${imagePath}`);
  const decodedImage = tf.node.decodeImage(image, 3);
  const model = await load();
  const embeddings = model.infer(decodedImage);
  return embeddings;
};

const cosineSimilarity = (a: tf.Tensor<tf.Rank>, b: tf.Tensor<tf.Rank>) => {
  const aVec = a.flatten();
  const bVec = b.flatten();
  const dotProduct = aVec.dot(bVec);
  const normA = aVec.norm();
  const normB = bVec.norm();
  return dotProduct.div(normA.mul(normB));
};

const calculateSimilarity = async (imagePath1: string, imagePath2: string) => {
  const embedding1 = await getImageEmbedding(imagePath1);
  const embedding2 = await getImageEmbedding(imagePath2);
  const similarity = cosineSimilarity(embedding1, embedding2);
  return similarity.arraySync() as number;
};

export const findSimilarThumbnails = async (targetID: number) => {
  const allImagePaths = (await repository.getFileThumbnails()).map((v) => ({
    fileName: v.fileName,
    thumbnails: JSON.parse(v.thumbnails ?? '[]') as string[],
    id: v.id,
  }));

  const targetImagePaths = allImagePaths.filter((v) => v.id === targetID)[0];

  if (isNil(targetImagePaths)) throw new Error('비교 대상을 찾을 수 없음');

  const otherImagePaths = allImagePaths.filter((v) => v.id !== targetID);

  const compareResult = await Promise.all(
    targetImagePaths.thumbnails.flatMap((targetImagePath) =>
      otherImagePaths.flatMap((otherImagePath) => {
        const id = otherImagePath.id;
        const fileName = otherImagePath.fileName;
        return otherImagePath.thumbnails.flatMap(async (v) => {
          const similarity = await calculateSimilarity(targetImagePath, v);
          return {
            id,
            similarity,
            thumbnailPath: v,
            fileName,
          };
        });
      }),
    ),
  );

  const uniqueCompareResult = compareResult
    .sort((a, b) => b.similarity - a.similarity)
    .reduce<
      {
        id: number;
        similarity: number;
        thumbnailPath: string;
        fileName: string;
      }[]
    >((acc, cur) => {
      if (isNil(acc.find((v) => v.thumbnailPath === cur.thumbnailPath))) {
        acc.push(cur);
      }

      return acc;
    }, []);

  const thumbnailPath = getStorePath().thumbnailPath;

  return uniqueCompareResult.map((v) => {
    const image = getBase64Image(`${thumbnailPath}/${v.thumbnailPath}`);

    return {
      id: v.id,
      similarity: v.similarity,
      thumbnail: image,
      fileName: v.fileName,
    };
  });
};