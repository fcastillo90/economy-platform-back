import dateService from '../api/services/dateService';

describe('date endpoint', () => {
  it('should query', async () => {
    expect.assertions(2);
    const res = await dateService.getDateService({ params: { key: 'oro', date: '10-03-2020' } });
    expect(res.status).toStrictEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
