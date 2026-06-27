import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Category: a
    .model({
      name: a.string().required(),
      slug: a.string().required(),
      icon: a.string(),
      description: a.string(),
      courses: a.hasMany('Course', 'categoryId'),
    })
    .authorization((allow) => [allow.guest().to(['read']), allow.group('admins')]),

  Course: a
    .model({
      title: a.string().required(),
      slug: a.string().required(),
      description: a.string().required(),
      shortDescription: a.string(),
      thumbnail: a.string(),
      previewVideo: a.string(),
      price: a.float().required(),
      originalPrice: a.float(),
      currency: a.string().default('USD'),
      level: a.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS']),
      language: a.string().default('English'),
      status: a.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
      instructorId: a.string().required(),
      categoryId: a.id(),
      category: a.belongsTo('Category', 'categoryId'),
      requirements: a.string().array(),
      whatYouLearn: a.string().array(),
      tags: a.string().array(),
      totalStudents: a.integer().default(0),
      totalReviews: a.integer().default(0),
      avgRating: a.float().default(0),
      totalDuration: a.integer().default(0),
      totalLessons: a.integer().default(0),
      isFeatured: a.boolean().default(false),
      isBestseller: a.boolean().default(false),
      certificate: a.boolean().default(true),
      sections: a.hasMany('Section', 'courseId'),
      enrollments: a.hasMany('Enrollment', 'courseId'),
      reviews: a.hasMany('Review', 'courseId'),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated().to(['read']),
      allow.group('instructors'),
      allow.group('admins'),
    ]),

  Section: a
    .model({
      title: a.string().required(),
      order: a.integer().required(),
      courseId: a.id().required(),
      course: a.belongsTo('Course', 'courseId'),
      lessons: a.hasMany('Lesson', 'sectionId'),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated().to(['read']),
      allow.group('instructors'),
      allow.group('admins'),
    ]),

  Lesson: a
    .model({
      title: a.string().required(),
      order: a.integer().required(),
      type: a.enum(['VIDEO', 'ARTICLE', 'QUIZ']),
      videoUrl: a.string(),
      videoKey: a.string(),
      duration: a.integer(),
      content: a.string(),
      isFree: a.boolean().default(false),
      sectionId: a.id().required(),
      section: a.belongsTo('Section', 'sectionId'),
      progress: a.hasMany('LessonProgress', 'lessonId'),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated().to(['read']),
      allow.group('instructors'),
      allow.group('admins'),
    ]),

  Enrollment: a
    .model({
      userId: a.string().required(),
      courseId: a.id().required(),
      course: a.belongsTo('Course', 'courseId'),
      paymentId: a.string(),
      amountPaid: a.float(),
      completedAt: a.datetime(),
      certificateUrl: a.string(),
      progressPercent: a.float().default(0),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create', 'update']),
      allow.group('admins'),
    ]),

  LessonProgress: a
    .model({
      userId: a.string().required(),
      lessonId: a.id().required(),
      lesson: a.belongsTo('Lesson', 'lessonId'),
      courseId: a.id().required(),
      completed: a.boolean().default(false),
      watchedSeconds: a.integer().default(0),
      lastWatchedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  Review: a
    .model({
      userId: a.string().required(),
      courseId: a.id().required(),
      course: a.belongsTo('Course', 'courseId'),
      rating: a.integer().required(),
      title: a.string(),
      body: a.string(),
      helpful: a.integer().default(0),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.owner().to(['read', 'create', 'update', 'delete']),
      allow.group('admins'),
    ]),

  UserProfile: a
    .model({
      userId: a.string().required(),
      displayName: a.string(),
      bio: a.string(),
      headline: a.string(),
      website: a.url(),
      avatarUrl: a.string(),
      stripeCustomerId: a.string(),
      stripeAccountId: a.string(),
      totalEarnings: a.float().default(0),
      socialLinks: a.json(),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.owner(),
      allow.group('admins'),
    ]),

  Order: a
    .model({
      userId: a.string().required(),
      courseIds: a.id().array(),
      totalAmount: a.float().required(),
      currency: a.string().default('USD'),
      status: a.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']),
      stripePaymentIntentId: a.string(),
      stripeCheckoutSessionId: a.string(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create']),
      allow.group('admins'),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationConfig: { expiresInDays: 30 },
  },
});
