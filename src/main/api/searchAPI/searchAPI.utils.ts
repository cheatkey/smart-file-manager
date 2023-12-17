import * as tf from '@tensorflow/tfjs-node';
import { load } from '@tensorflow-models/mobilenet';
import fs from 'fs';
import { getStorePath } from '../utils';

export const getImageEmbedding = async (imagePath: string) => {
  const thumbnailPath = getStorePath().thumbnailPath;

  const image = fs.readFileSync(`${thumbnailPath}/${imagePath}`);
  const decodedImage = tf.node.decodeImage(image, 3);
  const model = await load();
  const embeddings = model.infer(decodedImage);
  return embeddings;
};

export const cosineSimilarity = (
  a: tf.Tensor<tf.Rank>,
  b: tf.Tensor<tf.Rank>,
) => {
  const aVec = a.flatten();
  const bVec = b.flatten();
  const dotProduct = aVec.dot(bVec);
  const normA = aVec.norm();
  const normB = bVec.norm();
  return dotProduct.div(normA.mul(normB));
};

export const calculateImagesSimilarity = async (
  imagePath1: string,
  imagePath2: string,
) => {
  const embedding1 = await getImageEmbedding(imagePath1);
  const embedding2 = await getImageEmbedding(imagePath2);
  const similarity = cosineSimilarity(embedding1, embedding2);
  return similarity.arraySync() as number;
};
