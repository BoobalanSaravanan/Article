import { Event } from '../models/Event.js';
import { Article } from '../models/Article.js';

export const createEvent = async (req, res, next) => {
  try {
    const payload = req.body;
    const event = await Event.create(payload);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const getAnalyticsSummary = async (_req, res, next) => {
  try {
    const totalCtaClicks = await Event.countDocuments({ eventType: { $regex: '_click$' } });

    const [mostClickedCta] = await Event.aggregate([
      { $match: { eventType: { $regex: '_click$' } } },
      { $group: { _id: '$eventType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const [mostViewedArticle] = await Event.aggregate([
      { $match: { eventType: 'article_view', articleId: { $ne: null } } },
      { $group: { _id: '$articleId', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: '_id',
          as: 'article'
        }
      },
      { $unwind: '$article' },
      { $project: { title: '$article.title', views: 1 } }
    ]);

    const [avgTimeResult] = await Event.aggregate([
      { $match: { timeOnPage: { $gt: 0 } } },
      { $group: { _id: null, average: { $avg: '$timeOnPage' } } }
    ]);

    const scrollDepthDistribution = await Event.aggregate([
      { $match: { eventType: 'scroll_depth' } },
      { $group: { _id: '$scrollDepth', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const conversionRatePerArticle = await Article.aggregate([
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: 'articleId',
          as: 'events'
        }
      },
      {
        $project: {
          title: 1,
          views: {
            $size: {
              $filter: {
                input: '$events',
                as: 'evt',
                cond: { $eq: ['$$evt.eventType', 'article_view'] }
              }
            }
          },
          clicks: {
            $size: {
              $filter: {
                input: '$events',
                as: 'evt',
                cond: { $regexMatch: { input: '$$evt.eventType', regex: '_click$' } }
              }
            }
          }
        }
      },
      {
        $addFields: {
          conversionRate: {
            $cond: [{ $eq: ['$views', 0] }, 0, { $multiply: [{ $divide: ['$clicks', '$views'] }, 100] }]
          }
        }
      }
    ]);

    res.json({
      totalCtaClicks,
      mostClickedCta: mostClickedCta?._id || null,
      mostViewedArticle: mostViewedArticle || null,
      averageTimeSpent: Number((avgTimeResult?.average || 0).toFixed(2)),
      scrollDepthDistribution,
      conversionRatePerArticle
    });
  } catch (error) {
    next(error);
  }
};
