import { faker } from '@faker-js/faker';

export const MAX_MESSAGES = 6

faker.seed(12)

export const generateMessage = (text: string, displayForm: boolean = false) => ({
  key: faker.string.uuid(),
  content: faker.commerce.price({ min: 5, max: 1000, dec: 2, symbol: '$' }),
  description: text || faker.lorem.sentences({ min: 1, max: 2 }),
  user: {
    name: faker.internet.username(),
    avatar: faker.image.avatarGitHub(),
  },
  displayForm
})

export type ChatItem = ReturnType<typeof generateMessage>
