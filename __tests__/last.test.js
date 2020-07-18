import lastService from '../api/services/lastService';

describe('last endpoint', () => {
  it('should query', async () => {
    expect.assertions(2);
    const res = await lastService.getLastService();
    expect(res.status).toStrictEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
