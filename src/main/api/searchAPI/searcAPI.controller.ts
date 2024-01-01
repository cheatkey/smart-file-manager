import * as tf from '@tensorflow/tfjs-node';
import { z } from 'zod';
import {
  getBase64Image,
  getBase64Images,
  getStorePath,
  getIntersection,
  ipcFunction,
  getJsonIntersectionPercentage,
} from '../utils';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import { repository } from '../../database';
import { load as encoderLoad } from '@tensorflow-models/universal-sentence-encoder';
import omit from 'lodash/omit';
import { calculateImagesSimilarity } from './searchAPI.utils';

export class SearchService {
  private searchSimilarCosineThumbnails = async (targetID: number) => {
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
            const similarity = await calculateImagesSimilarity(
              targetImagePath,
              v,
            );
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

  private findSimilarCosineMemo = async (targetID: number) => {
    const model = await encoderLoad();
    const allFiles = await repository.getAllFiles.default();

    const targetMemo = allFiles.find((v) => v.id === targetID)?.memo;
    if (isNil(targetMemo)) throw new Error('파일을 찾을 수 없음');
    const otherFileList = allFiles.filter((v) => v.id !== targetID);

    const scores = [];

    for await (const otherFile of otherFileList) {
      try {
        const sentences = [targetMemo, otherFile.memo];
        const embeddings = await model.embed(sentences);
        const sentenceA = embeddings.slice([0, 0], [1]);
        const sentenceB = embeddings.slice([1, 0], [1]);
        const similarity = tf.losses.cosineDistance(sentenceA, sentenceB, 0);

        scores.push({
          id: otherFile.id,
          similarity: similarity.dataSync()[0],
          fileName: otherFile.fileName,
          thumbnails: otherFile.thumbnails,
        });
      } catch (err) {}
    }

    scores.sort((a, b) => b.similarity - a.similarity);

    return scores;
  };

  public findSimilarMemo = ipcFunction(
    z.object({
      id: z.number(),
    }),
    async (input) => {
      const result = await this.findSimilarCosineMemo(input.id);

      return result.map((v) => ({
        ...v,
        thumbnails: getBase64Images(v.thumbnails),
      }));
    },
  );

  public findTagSimilar = ipcFunction(
    z.object({
      id: z.number(),
    }),
    async (input) => {
      const data = await repository.getFile(input.id);
      const targetTags = data?.tags.map((v) => v.tagName);
      if (isNil(targetTags) || targetTags.length === 0)
        throw new Error('대상 태그가 지정되지 않음');

      const allFile = await repository.getAllFiles.includeTags();

      return allFile
        .reduce<
          {
            id: number;
            score: number;
            fileName: string;
            thumbnails: string[];
          }[]
        >((acc, cur) => {
          const tagIntersection = getIntersection(
            targetTags,
            cur.tags.map((v) => v.tagName),
          );
          const hasIntersection = tagIntersection.length > 0;
          if (!hasIntersection) return acc;

          const intersectionPercentage =
            (tagIntersection.length / targetTags.length) * 100;

          acc.push({
            id: cur.id,
            score: intersectionPercentage,
            fileName: cur.fileName,
            thumbnails: getBase64Images(cur.thumbnails),
          });
          return acc;
        }, [])
        .sort((a, b) => b.score - a.score);
    },
  );

  public findMetadataSimilar = ipcFunction(
    z.object({
      id: z.number(),
    }),
    async (input) => {
      const data = await repository.getFile(input.id);
      if (isNil(data) || isNil(data?.metadata)) {
        throw new Error('파일이 지정되지 않음');
      }

      const allFile = await repository.getAllFiles.default();

      return allFile
        .reduce<
          {
            id: number;
            score: number;
            fileName: string;
            thumbnails: string[];
          }[]
        >((acc, cur) => {
          const intersectionPercentage =
            getJsonIntersectionPercentage(
              JSON.parse(data.metadata),
              JSON.parse(cur.metadata),
            ) * 100;

          if (intersectionPercentage > 0) {
            acc.push({
              id: cur.id,
              score: intersectionPercentage,
              fileName: cur.fileName,
              thumbnails: getBase64Images(cur.thumbnails),
            });
          }
          return acc;
        }, [])
        .sort((a, b) => b.score - a.score);
    },
  );

  findSimilarThumbnails = ipcFunction(
    z.object({
      id: z.number(),
    }),
    (input) => {
      return this.searchSimilarCosineThumbnails(input.id);
    },
  );

  findTagFiles = ipcFunction(
    z.object({
      tagName: z.string(),
    }),
    async (input) => {
      const found = await repository.findTagFiles(input.tagName);

      return {
        ...found,
        files: found?.files.map((v) => ({
          ...omit(v, 'thumbnails'),
          thumbnails: getBase64Images(v.thumbnails),
        })),
      };
    },
  );

  findMeataDataEqual = ipcFunction(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
    async (input) => {
      const allFiles = await repository.getAllFiles.default();

      const matchedFiles = allFiles.filter((file) => {
        return (
          (get(JSON.parse(file.metadata), input.key) ?? '').trim() ===
          (input.value ?? '').trim()
        );
      });

      return matchedFiles.map((v) => ({
        ...omit(v, 'thumbnails'),
        thumbnails: getBase64Images(v.thumbnails),
      }));
    },
  );

  findFilesByQuery = ipcFunction(
    z.object({
      query: z.string(),
    }),
    async (input) => {
      const allFiles = await repository.getAllFiles.default();

      const matchedFiles = allFiles.filter((file) => {
        return (
          file.fileName.includes(input.query) ||
          file.memo.includes(input.query) ||
          file.metadata.includes(input.query)
        );
      });

      return matchedFiles.map((v) => ({
        ...omit(v, 'thumbnails'),
        thumbnails: getBase64Images(v.thumbnails),
      }));
    },
  );
}
