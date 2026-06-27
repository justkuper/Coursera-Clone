import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'courseMediaBucket',
  access: (allow) => ({
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
      allow.group('instructors').to(['read', 'write', 'delete']),
      allow.group('admins').to(['read', 'write', 'delete']),
    ],
    'courses/{courseId}/videos/*': [
      allow.authenticated.to(['read']),
      allow.group('instructors').to(['read', 'write', 'delete']),
      allow.group('admins').to(['read', 'write', 'delete']),
    ],
    'users/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read']),
    ],
    'certificates/*': [
      allow.authenticated.to(['read']),
      allow.group('admins').to(['read', 'write', 'delete']),
    ],
  }),
});
