import { z } from 'zod';
import { ipcFunction } from '../utils';
import { repository } from '../../database';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { isNil, countBy } from 'lodash';
import { SearchService } from '../searchAPI/searcAPI.controller';

dayjs.extend(duration);

export class RecommendService {
  public getRecommendedFiles = ipcFunction(z.object({}), async (input) => {
    const allFiles = await repository.getAllFiles.includeActivity();

    const highScoreFiles = allFiles.filter((item) => item.rating >= 7);

    const openedInCurrentTimeRangeFiles = highScoreFiles.filter((item) => {
      const lastOpenDate = item.activity.at(-1)?.date;
      if (isNil(lastOpenDate)) return false;

      const resultDate = dayjs(lastOpenDate);
      const now = dayjs();

      const resultTimeInMinutes = resultDate.hour() * 60 + resultDate.minute();
      const comparisonTimeInMinutes = now.hour() * 60 + now.minute();

      const diffInMinutes = Math.abs(
        resultTimeInMinutes - comparisonTimeInMinutes,
      );

      return diffInMinutes <= 30;
    });

    const lastMonthOpenedFiles = highScoreFiles.filter((item) => {
      const itemDate = item.activity.at(-1)?.date;
      if (isNil(itemDate)) return false;
      const now = dayjs();

      return dayjs.duration(dayjs(itemDate).diff(now)).asMonths() >= 1;
    });

    const recentActivity = await repository.getRecentActivity();

    const searchService = new SearchService();

    const similarTagResults = await Promise.all(
      recentActivity.map(async (v) => {
        try {
          return await searchService.findTagSimilar({
            id: v.id,
          });
        } catch (err) {
          return {
            success: false,
            data: [],
          };
        }
      }),
    );

    const resultHighSimilarTags = similarTagResults.flatMap(
      (v) => v.data?.filter((item) => item.score >= 40),
    );

    const countResult = countBy([
      ...highScoreFiles.map((v) => v.id),
      ...openedInCurrentTimeRangeFiles.map((v) => v.id),
      ...lastMonthOpenedFiles.map((v) => v.id),
      ...resultHighSimilarTags.map((v) => v?.id),
    ]);

    return Object.entries(countResult)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  });
}
