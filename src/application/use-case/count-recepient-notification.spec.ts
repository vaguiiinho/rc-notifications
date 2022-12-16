import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipients notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient1',
    });

    expect(count).toEqual(2);
  });
});
